package com.betha.plataforma.auth;

import feign.FeignException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Optional;

@Component
public class BethaAuthenticationHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(BethaAuthenticationHandler.class);

    private final OauthChallengeUtils oauthChallengeUtils;
    private final OauthApi oauthApi;

    private final String urlOauth;
    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;
    private final String callback;
    private final String scopes;

    private static final String TOKEN_SESSION_ATTRIBUTE = "authorization_token";

    public BethaAuthenticationHandler(final OauthChallengeUtils oauthChallengeUtils,
                                      final OauthApi oauthApi,
                                      final @Value("${betha.services.oauth}") String urlOauth,
                                      final @Value("${betha.auth.oauth.client.id}") String clientId,
                                      final @Value("${betha.auth.oauth.client.secret}") String clientSecret,
                                      final @Value("${betha.auth.oauth.client.redirect}") String redirectUri,
                                      final @Value("${betha.auth.oauth.client.callback}") String callback,
                                      final @Value("${betha.auth.oauth.client.scopes}") String scopes) {

        this.oauthChallengeUtils = oauthChallengeUtils;
        this.oauthApi = oauthApi;
        this.urlOauth = urlOauth;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.callback = callback;
        this.scopes = scopes;
    }

    public void redirectLogin(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        final String challengeVerifier = oauthChallengeUtils.createAndSaveChallengeVerifier(request);
        final String state = oauthChallengeUtils.createAndSaveState(request);

        final String redirect = UriComponentsBuilder.fromHttpUrl(urlOauth + "/authorize")
            .queryParam("response_type", "code")
            .queryParam("client_id", clientId)
            .queryParam("redirect_uri", callback)
            .queryParam("scope", scopes)
            .queryParam("code_challenge", challengeVerifier)
            .queryParam("code_challenge_method", "S256")
            .queryParam("state", state)
            .build()
            .encode()
            .toUriString();

        response.sendRedirect(redirect);
    }

    public void redirectApp(final HttpServletResponse response) throws IOException {
        response.sendRedirect(redirectUri);
    }

    public void exchangeAndSaveAuthorizationCode(final String code,
                                                 final String state,
                                                 final HttpServletRequest request) {
        if (!oauthChallengeUtils.consumeAndValidateState(request, state)) {
            throw new InvalidOauthStateException();
        }

        final String verifier = oauthChallengeUtils.getVerifierFromSession(request);
        if (verifier == null) {
            throw new InvalidOauthStateException();
        }

        final MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", "authorization_code");
        parameters.add("client_id", clientId);
        if (hasText(clientSecret)) {
            parameters.add("client_secret", clientSecret);
        }
        parameters.add("redirect_uri", callback);
        parameters.add("code_verifier", verifier);
        parameters.add("code", code);

        final OauthToken token = oauthApi.exchangeAuthorizationCode(parameters);
        oauthChallengeUtils.clearVerifier(request);
        request.getSession(true);
        request.changeSessionId();
        storeInSession(token, request);
    }

    public Optional<OauthToken> getTokenFromSession(final HttpSession nullableSession) {
        return Optional.ofNullable(nullableSession)
            .map(session -> (OauthToken) session.getAttribute(TOKEN_SESSION_ATTRIBUTE));
    }

    public OauthToken getPresentTokenFromSession(final HttpSession session) {
        return getTokenFromSession(session).orElse(null);
    }

    public Optional<OauthToken> getValidToken(final HttpServletRequest request) {
        final Optional<OauthToken> optionalToken = getTokenFromSession(request.getSession(false));
        if (!optionalToken.isPresent() || !optionalToken.get().isValid()) {
            return Optional.empty();
        }

        final OauthToken token = optionalToken.get();
        if (token.expired()) {
            try {
                refreshAndSaveAccessToken(token, request);
            } catch (RefreshTokenException e) {
                invalidateSession(request);
                return Optional.empty();
            }
        }
        return getTokenFromSession(request.getSession(false));
    }

    public OauthToken requireValidToken(final HttpServletRequest request) {
        return getValidToken(request).orElseThrow(UnauthenticatedException::new);
    }

    public void refreshAndSaveAccessToken(final OauthToken token, final HttpServletRequest request)
        throws RefreshTokenException {

        final MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", "refresh_token");
        parameters.add("client_id", clientId);
        parameters.add("redirect_uri", callback);
        parameters.add("refresh_token", token.getRefreshToken());
        parameters.add("client_secret", clientSecret);

        try {
            final OauthToken refreshedToken = oauthApi.refreshToken(parameters);
            if (refreshedToken.getRefreshToken() == null) {
                refreshedToken.setRefreshToken(token.getRefreshToken());
            }
            if (refreshedToken.getUser() == null) {
                refreshedToken.setUser(token.getUser());
            }
            if (refreshedToken.getScope() == null) {
                refreshedToken.setScope(token.getScope());
            }
            storeInSession(refreshedToken, request);

        } catch (FeignException.FeignClientException e) {
            throw new RefreshTokenException();
        }
    }

    private static void storeInSession(final OauthToken token, final HttpServletRequest request) {
        token.markIssuedNow();
        request.getSession(true).setAttribute(TOKEN_SESSION_ATTRIBUTE, token);
    }

    public void invalidateSession(final HttpServletRequest request) {
        final HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    private static boolean hasText(final String value) {
        return value != null && !value.trim().isEmpty();
    }
}
