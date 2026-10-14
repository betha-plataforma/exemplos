package com.betha.plataforma.integration;

import com.betha.plataforma.auth.OauthToken;
import com.betha.plataforma.auth.Usuario;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Component
public class BethaPlatformClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(BethaPlatformClient.class);
    private static final int MAX_ERROR_BODY_LENGTH = 2000;
    private static final String PAGE_MAPPING_VERSION = "latest";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String userAccountsUrl;
    private final String sessionsUrl;

    public BethaPlatformClient(final RestTemplateBuilder restTemplateBuilder,
                               final ObjectMapper objectMapper,
                               final @Value("${betha.services.user-accounts}") String userAccountsUrl,
                               final @Value("${betha.services.sessions}") String sessionsUrl) {
        this.restTemplate = restTemplateBuilder
            .setConnectTimeout(Duration.ofSeconds(5))
            .setReadTimeout(Duration.ofSeconds(10))
            .build();
        this.objectMapper = objectMapper;
        this.userAccountsUrl = withoutTrailingSlash(userAccountsUrl);
        this.sessionsUrl = withoutTrailingSlash(sessionsUrl);
    }

    public Usuario getCurrentUser(final OauthToken token) {
        final JsonNode response = exchangeJson(userAccountsUrl + "/users/@me", HttpMethod.GET, token, null, null);
        return objectMapper.convertValue(response, Usuario.class);
    }

    public List<BethaAccess> getCurrentUserAccesses(final OauthToken token) {
        final JsonNode response = exchangeJson(userAccountsUrl + "/suite/users/@me/access", HttpMethod.GET, token, null, null);
        final JsonNode items = response.isArray() ? response : firstPresent(response, "content", "items", "data");
        if (items == null || !items.isArray()) {
            LOGGER.warn("Formato inesperado em suite/users/@me/access: tipo={}, campos={}",
                response.getNodeType(), fieldNames(response));
            return Collections.emptyList();
        }

        final List<BethaAccess> result = new ArrayList<>();
        items.forEach(item -> result.add(objectMapper.convertValue(item, BethaAccess.class)));
        LOGGER.info("suite/users/@me/access convertido: {} acesso(s)", result.size());
        return result;
    }

    public void verifySession(final OauthToken token, final String userAccess) {
        exchangeJson(sessionsUrl + "/verify", HttpMethod.GET, token, userAccess, null);
    }

    public void reportActivity(final OauthToken token, final String userAccess) {
        exchangeJson(sessionsUrl + "/activity", HttpMethod.PUT, token, userAccess, objectMapper.createObjectNode());
    }

    public JsonNode getTermOfResponsibility(final OauthToken token,
                                            final String userAccess,
                                            final String accessId) {
        return exchangeJson(userAccountsUrl + "/users/@me/access/" + encodeSegment(accessId)
            + "/term-of-responsibility", HttpMethod.GET, token, userAccess, null);
    }

    public void acceptAccess(final OauthToken token, final String userAccess, final String accessId) {
        exchangeJson(userAccountsUrl + "/users/@me/access/" + encodeSegment(accessId)
            + "/accept", HttpMethod.PUT, token, userAccess, objectMapper.createObjectNode());
    }

    public JsonNode listContextAccesses(final OauthToken token, final String userAccess) {
        return exchangeJson(userAccountsUrl + "/management/access?limit=20&offset=0",
            HttpMethod.GET, token, userAccess, null);
    }

    public boolean isAllowed(final OauthToken token,
                             final String userAccess,
                             final String resource,
                             final String method) {
        try {
            requireAllowed(token, userAccess, resource, method);
            return true;
        } catch (BethaApiException e) {
            if (e.getStatus() == 403) {
                return false;
            }
            throw e;
        }
    }

    public void requireAllowed(final OauthToken userToken,
                               final String userAccess,
                               final String resource,
                               final String method) {
        final String encodedResource = UriUtils.encodePathSegment(resource, StandardCharsets.UTF_8);
        final String url = userAccountsUrl + "/resources/" + encodedResource
            + "/methods/" + encodeSegment(method.toUpperCase()) + "/constraints";
        final HeaderParam headerPageMappingVersion = new HeaderParam("Page-Mapping-Version", PAGE_MAPPING_VERSION);
        exchangeJson(url, HttpMethod.GET, userToken, userAccess, null, headerPageMappingVersion);
    }

    public JsonNode getSystems(final OauthToken token,
                               final String userAccess,
                               final String accessId,
                               final String exercise) {
        final JsonNode response = exchangeJson(userAccountsUrl + "/access/" + encodeSegment(accessId)
            + "/systems", HttpMethod.GET, token, userAccess, null);
        if (exercise != null && !exercise.trim().isEmpty() && response.isArray()) {
            final ArrayNode systems = (ArrayNode) response;
            systems.forEach(system -> appendExercise(system, exercise));
        }
        return response;
    }

    public ResponseEntity<byte[]> getUserPhoto(final OauthToken token, final String photoUrl) {
        try {
            final HttpHeaders headers = headers(token, null);
            return restTemplate.exchange(URI.create(photoUrl), HttpMethod.GET, new HttpEntity<>(headers), byte[].class);
        } catch (HttpStatusCodeException e) {
            throw translate(e);
        } catch (ResourceAccessException | IllegalArgumentException e) {
            throw unavailable(e);
        }
    }

    private JsonNode exchangeJson(final String url,
                                  final HttpMethod method,
                                  final OauthToken token,
                                  final String userAccess,
                                  final JsonNode body,
                                  HeaderParam... headerParams) {
        final long startedAt = System.currentTimeMillis();
        LOGGER.info("Betha API -> {} {} (User-Access={}, scopes={})",
            method, url, hasText(userAccess), safeScopes(token));
        try {
            final HttpHeaders headers = headers(token, userAccess, headerParams);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            if (body != null) {
                headers.setContentType(MediaType.APPLICATION_JSON);
            }
            final ResponseEntity<JsonNode> response = restTemplate.exchange(
                URI.create(url), method, new HttpEntity<>(body, headers), JsonNode.class);
            LOGGER.info("Betha API <- {} {}: HTTP {} ({} ms)",
                method, url, response.getStatusCodeValue(), elapsedSince(startedAt));
            return response.getBody() == null ? objectMapper.createObjectNode() : response.getBody();
        } catch (HttpStatusCodeException e) {
            LOGGER.warn("Betha API <- {} {}: HTTP {} {} ({} ms), resposta={}, headersDiagnostico={}",
                method, url, e.getRawStatusCode(), e.getStatusText(), elapsedSince(startedAt),
                errorBody(e.getResponseBodyAsString()), diagnosticHeaders(e));
            throw translate(e);
        } catch (ResourceAccessException e) {
            LOGGER.error("Betha API indisponível: {} {} ({} ms): {}",
                method, url, elapsedSince(startedAt), e.getMessage(), e);
            throw unavailable(e);
        } catch (RestClientException e) {
            LOGGER.error("Resposta inválida da Betha API: {} {} ({} ms): {}",
                method, url, elapsedSince(startedAt), e.getMessage(), e);
            throw unavailable(e);
        } catch (IllegalArgumentException e) {
            LOGGER.error("URL inválida na integração Betha: {} {}: {}", method, url, e.getMessage(), e);
            throw unavailable(e);
        }
    }

    private HttpHeaders headers(final OauthToken token, final String userAccess, HeaderParam... headerParams) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token.getAccessToken());

        if (userAccess != null && !userAccess.trim().isEmpty()) {
            headers.set("User-Access", userAccess);
        }

        for (HeaderParam headerParam : headerParams) {
            if (
                (headerParam.getHeaderName() != null && !headerParam.getHeaderName().trim().isEmpty())
                && (headerParam.getHeaderValue() != null && !headerParam.getHeaderValue().trim().isEmpty())
            ) {
                headers.set(headerParam.getHeaderName(), headerParam.getHeaderValue());
            }
        }

        return headers;
    }

    private BethaApiException translate(final HttpStatusCodeException exception) {
        String code = exception.getRawStatusCode() == 401
            ? "BETHA_UPSTREAM_UNAUTHORIZED"
            : "BETHA_REQUEST_DENIED";
        String message = "A Plataforma Betha negou a operação";
        String restrictionType = null;
        try {
            final JsonNode error = objectMapper.readTree(exception.getResponseBodyAsString());
            code = text(error, "code", text(error, "error", code));
            restrictionType = text(error, "classificationCode", text(error, "type", null));
            message = text(error, "message", text(error, "error_description", message));
            final JsonNode restriction = error.get("restriction");
            if (restriction != null) {
                restrictionType = text(restriction, "classificationCode", text(restriction, "type", restrictionType));
                message = text(restriction, "message", message);
            }
        } catch (Exception ignored) {
            if (!exception.getStatusText().trim().isEmpty()) {
                message = exception.getStatusText();
            }
        }
        return new BethaApiException(exception.getRawStatusCode(), code, message, restrictionType);
    }

    private BethaApiException unavailable(final Exception cause) {
        return new BethaApiException(
            503,
            "BETHA_SERVICE_UNAVAILABLE",
            "Não foi possível consultar a Plataforma Betha: " + cause.getMessage(),
            null
        );
    }

    private static JsonNode firstPresent(final JsonNode node, final String... fields) {
        for (String field : fields) {
            if (node.has(field)) {
                return node.get(field);
            }
        }
        return null;
    }

    private static List<String> fieldNames(final JsonNode node) {
        if (node == null || !node.isObject()) {
            return Collections.emptyList();
        }
        final List<String> names = new ArrayList<>();
        final Iterator<String> iterator = node.fieldNames();
        while (iterator.hasNext()) {
            names.add(iterator.next());
        }
        return names;
    }

    private static String text(final JsonNode node, final String field, final String fallback) {
        return node != null && node.hasNonNull(field) ? node.get(field).asText() : fallback;
    }

    private static String withoutTrailingSlash(final String value) {
        return value != null && value.endsWith("/") ? value.substring(0, value.length() - 1) : value;
    }

    private static boolean hasText(final String value) {
        return value != null && !value.trim().isEmpty();
    }

    private static String safeScopes(final OauthToken token) {
        return token == null || !hasText(token.getScope()) ? "não informados pelo OAuth" : token.getScope();
    }

    private static long elapsedSince(final long startedAt) {
        return System.currentTimeMillis() - startedAt;
    }

    private static String errorBody(final String body) {
        if (!hasText(body)) {
            return "<vazio>";
        }
        final String singleLine = body
            .replaceAll("(?i)(Bearer\\s+)[A-Za-z0-9._~+/=-]+", "$1<redacted>")
            .replaceAll("(?i)(\\\"?(?:access_token|refresh_token|authorization)\\\"?\\s*[:=]\\s*\\\"?)[^\\\"\\s,}]+", "$1<redacted>")
            .replaceAll("[\\r\\n]+", " ")
            .trim();
        return singleLine.length() <= MAX_ERROR_BODY_LENGTH
            ? singleLine
            : singleLine.substring(0, MAX_ERROR_BODY_LENGTH) + "…";
    }

    private static String diagnosticHeaders(final HttpStatusCodeException exception) {
        if (exception.getResponseHeaders() == null) {
            return "{}";
        }
        final List<String> headers = new ArrayList<>();
        appendHeader(headers, exception, "WWW-Authenticate");
        appendHeader(headers, exception, "X-Request-Id");
        appendHeader(headers, exception, "X-Amzn-RequestId");
        appendHeader(headers, exception, "X-Amzn-ErrorType");
        appendHeader(headers, exception, "Server");
        return headers.toString();
    }

    private static void appendHeader(final List<String> destination,
                                     final HttpStatusCodeException exception,
                                     final String name) {
        final String value = exception.getResponseHeaders().getFirst(name);
        if (hasText(value)) {
            destination.add(name + "=" + value);
        }
    }

    private static String encodeSegment(final String value) {
        return UriUtils.encodePathSegment(value, StandardCharsets.UTF_8);
    }

    private static void appendExercise(final JsonNode system, final String exercise) {
        if (!(system instanceof ObjectNode) || !system.hasNonNull("url")) {
            return;
        }
        final ObjectNode object = (ObjectNode) system;
        final String url = object.get("url").asText();
        final int hashIndex = url.indexOf('#');
        final String base = hashIndex >= 0 ? url.substring(0, hashIndex) : url;
        final String fragment = hashIndex >= 0 ? url.substring(hashIndex) : "";
        final String separator = base.contains("?") ? "&" : "?";
        try {
            object.put("url", base + separator + "exercicio="
                + URLEncoder.encode(exercise, StandardCharsets.UTF_8.name()) + fragment);
        } catch (Exception ignored) {
            object.put("url", url);
        }
    }

    private static final class HeaderParam {
        private final String headerName;
        private final String headerValue;

        private HeaderParam(String headerName, String headerValue) {
            this.headerName = headerName;
            this.headerValue = headerValue;
        }

        public String getHeaderName() {
            return headerName;
        }

        public String getHeaderValue() {
            return headerValue;
        }
    }
}
