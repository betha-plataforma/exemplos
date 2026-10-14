package com.betha.plataforma.api;

import com.betha.plataforma.access.AuthorizationService;
import com.betha.plataforma.access.ContextService;
import com.betha.plataforma.auth.BethaAuthenticationHandler;
import com.betha.plataforma.auth.OauthToken;
import com.betha.plataforma.auth.Usuario;
import com.betha.plataforma.integration.BethaAccess;
import com.betha.plataforma.integration.BethaPlatformClient;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/session")
public class SessionController {

    private final BethaAuthenticationHandler authenticationHandler;
    private final BethaPlatformClient platformClient;
    private final ContextService contextService;
    private final AuthorizationService authorizationService;

    public SessionController(final BethaAuthenticationHandler authenticationHandler,
                             final BethaPlatformClient platformClient,
                             final ContextService contextService,
                             final AuthorizationService authorizationService) {
        this.authenticationHandler = authenticationHandler;
        this.platformClient = platformClient;
        this.contextService = contextService;
        this.authorizationService = authorizationService;
    }

    @GetMapping
    public SessionView current(final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        return buildView(request.getSession(), token);
    }

    @PostMapping("/context")
    public SessionView selectContext(@RequestBody final ContextSelection selection,
                                     final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final List<BethaAccess> accesses = currentSystemAccesses(token);
        final BethaAccess selected = contextService.select(
            request.getSession(), accesses, selection.getAccessId(), selection.getExercise());
        if (selected.isAccepted()) {
            platformClient.reportActivity(token, selected.getLicenseId());
        }
        return buildView(request.getSession(), token);
    }

    @GetMapping("/verify")
    public ResponseEntity<Void> verify(final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final BethaAccess selected = contextService.requireSelected(request.getSession(false));
        platformClient.verifySession(token, selected.getLicenseId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/activity")
    public ResponseEntity<Void> activity(final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final BethaAccess selected = contextService.requireSelected(request.getSession(false));
        platformClient.reportActivity(token, selected.getLicenseId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/term")
    public JsonNode term(final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final BethaAccess selected = contextService.requireSelected(request.getSession(false));
        return platformClient.getTermOfResponsibility(token, selected.getLicenseId(), selected.getId());
    }

    @PutMapping("/term/accept")
    public ResponseEntity<Void> acceptTerm(final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final BethaAccess selected = contextService.requireSelected(request.getSession(false));
        platformClient.acceptAccess(token, selected.getLicenseId(), selected.getId());
        return ResponseEntity.noContent().build();
    }

    private SessionView buildView(final HttpSession session, final OauthToken token) {
        final Usuario user = platformClient.getCurrentUser(token);
        final List<BethaAccess> accesses = currentSystemAccesses(token);
        final BethaAccess selected = contextService.resolveSelected(session, accesses);
        final Map<String, Object> capabilities = selected == null || !selected.isAccepted()
            ? Collections.emptyMap()
            : authorizationService.capabilities(token, selected);
        return new SessionView(user, token, accesses, selected, contextService.getSystemId(),
            contextService.getExercise(session), authorizationService.managerUrl(selected), capabilities);
    }

    private List<BethaAccess> currentSystemAccesses(final OauthToken token) {
        return contextService.forCurrentSystem(platformClient.getCurrentUserAccesses(token));
    }

    public static class ContextSelection {
        private String accessId;
        private String exercise;

        public String getAccessId() {
            return accessId;
        }

        public void setAccessId(String accessId) {
            this.accessId = accessId;
        }

        public String getExercise() {
            return exercise;
        }

        public void setExercise(String exercise) {
            this.exercise = exercise;
        }
    }
}
