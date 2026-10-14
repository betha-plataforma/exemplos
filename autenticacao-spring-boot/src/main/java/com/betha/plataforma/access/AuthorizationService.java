package com.betha.plataforma.access;

import com.betha.plataforma.auth.BethaAuthenticationHandler;
import com.betha.plataforma.auth.OauthToken;
import com.betha.plataforma.integration.BethaAccess;
import com.betha.plataforma.integration.BethaPlatformClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class AuthorizationService {

    private final BethaAuthenticationHandler authenticationHandler;
    private final BethaPlatformClient platformClient;
    private final ContextService contextService;
    private final String managerUrl;

    public AuthorizationService(final BethaAuthenticationHandler authenticationHandler,
                                final BethaPlatformClient platformClient,
                                final ContextService contextService,
                                final @Value("${betha.services.manager}") String managerUrl) {
        this.authenticationHandler = authenticationHandler;
        this.platformClient = platformClient;
        this.contextService = contextService;
        this.managerUrl = managerUrl.endsWith("/") ? managerUrl.substring(0, managerUrl.length() - 1) : managerUrl;
    }

    public void requireAllowed(final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final BethaAccess access = contextService.requireSelected(request.getSession(false));
        platformClient.requireAllowed(token, access.getLicenseId(), request.getRequestURI(), request.getMethod());
    }

    public Map<String, Object> capabilities(final OauthToken token, final BethaAccess access) {
        final Map<String, Object> capabilities = new LinkedHashMap<>();
        capabilities.put("menu1", menu1Capabilities(token, access));
        capabilities.put("menu2", readCapability(token, access, "/api/menu2"));
        capabilities.put("menu3", readCapability(token, access, "/api/menu3"));
        return capabilities;
    }

    public String managerUrl(final BethaAccess access) {
        if (access == null || !access.isAdmin()) {
            return null;
        }
        return managerUrl + "/#/entidades/" + access.getContext() + "/sistemas/" + contextService.getSystemId();
    }

    private Map<String, Boolean> menu1Capabilities(final OauthToken token, final BethaAccess access) {
        final Map<String, Boolean> permissions = new LinkedHashMap<>();
        permissions.put("read", allowed(token, access, "/api/examples", "GET"));
        permissions.put("create", allowed(token, access, "/api/examples", "POST"));
        permissions.put("edit", allowed(token, access, "/api/examples/1", "PUT"));
        permissions.put("delete", allowed(token, access, "/api/examples/1", "DELETE"));
        return permissions;
    }

    private Map<String, Boolean> readCapability(final OauthToken token,
                                                final BethaAccess access,
                                                final String resource) {
        final Map<String, Boolean> permission = new LinkedHashMap<>();
        permission.put("read", allowed(token, access, resource, "GET"));
        return permission;
    }

    private boolean allowed(final OauthToken token,
                            final BethaAccess access,
                            final String resource,
                            final String method) {
        return platformClient.isAllowed(token, access.getLicenseId(), resource, method);
    }
}
