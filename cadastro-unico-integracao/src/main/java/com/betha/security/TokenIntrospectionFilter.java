package com.betha.security;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TokenIntrospectionFilter extends OncePerRequestFilter {

    private final RestTemplate tokenClient;
    private final String tokenInfoUrl;
    private final AntPathMatcher matcher = new AntPathMatcher();

    public TokenIntrospectionFilter(RestTemplate tokenClient,
                                    @Value("${oauth2.token-info-url}") String tokenInfoUrl) {
        this.tokenClient = tokenClient;
        this.tokenInfoUrl = tokenInfoUrl;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token ausente ou inválido");
            return;
        }

        String token = authHeader.substring(7);
        TokenInfo info;
        try {
            ResponseEntity<TokenInfo> resp = tokenClient.getForEntity(
                    tokenInfoUrl + "?access_token=" + token,
                    TokenInfo.class
            );
            info = resp.getBody();
        } catch (HttpClientErrorException ex) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Falha na introspecção do token");
            return;
        }

        if (info == null || info.getScopes() == null) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Token sem escopos");
            return;
        }

        String requiredScope = resolveScope(request);
        if (requiredScope == null) {
            chain.doFilter(request, response);
            return;
        }

        if (!info.getScopes().contains(requiredScope)) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Escopo insuficiente");
            return;
        }

        List<GrantedAuthority> authorities = info.getScopes().stream()
                .map(s -> new SimpleGrantedAuthority("SCOPE_" + s))
                .collect(Collectors.toList());

        Authentication auth = new PreAuthenticatedAuthenticationToken(
                null,
                token,
                authorities
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        chain.doFilter(request, response);
    }

    private String resolveScope(HttpServletRequest request) {
        String path = request.getServletPath();
        String method = request.getMethod();

        if (matcher.match("/pessoas", path) || matcher.match("/pessoas/*", path)) {
            switch (method) {
                case "GET":
                    return "pessoas:read";
                case "POST":
                    return "pessoas:create";
                case "PUT":
                    return "pessoas:update";
                case "DELETE":
                    return "pessoas:delete";
            }
        }
        return null;
    }

    public static class TokenInfo {
        @JsonProperty("scopes")
        private List<String> scopes;

        public List<String> getScopes() {
            return scopes;
        }

        public void setScopes(List<String> scopes) {
            this.scopes = scopes;
        }
    }
}
