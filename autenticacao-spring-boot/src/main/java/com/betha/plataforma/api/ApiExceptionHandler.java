package com.betha.plataforma.api;

import com.betha.plataforma.access.ContextRequiredException;
import com.betha.plataforma.access.InvalidContextException;
import com.betha.plataforma.access.TechnicalAccessRequiredException;
import com.betha.plataforma.auth.InvalidOauthStateException;
import com.betha.plataforma.auth.UnauthenticatedException;
import com.betha.plataforma.integration.BethaApiException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ApiExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApiExceptionHandler.class);

    @ExceptionHandler(UnauthenticatedException.class)
    public ResponseEntity<ApiError> unauthenticated() {
        return response(HttpStatus.UNAUTHORIZED, "UNAUTHENTICATED", "Sessão não autenticada", null);
    }

    @ExceptionHandler(ContextRequiredException.class)
    public ResponseEntity<ApiError> contextRequired() {
        return response(HttpStatus.CONFLICT, "CONTEXT_REQUIRED", "Selecione uma entidade para continuar", null);
    }

    @ExceptionHandler(InvalidContextException.class)
    public ResponseEntity<ApiError> invalidContext() {
        return response(HttpStatus.FORBIDDEN, "INVALID_CONTEXT", "O acesso selecionado não pertence ao usuário e sistema atuais", null);
    }

    @ExceptionHandler(TechnicalAccessRequiredException.class)
    public ResponseEntity<ApiError> technicalAccessRequired() {
        return response(HttpStatus.FORBIDDEN, "TECHNICAL_ACCESS_REQUIRED",
            "Esta funcionalidade é exclusiva para acessos técnicos ou administradores", null);
    }

    @ExceptionHandler(InvalidOauthStateException.class)
    public ResponseEntity<ApiError> invalidState() {
        return response(HttpStatus.BAD_REQUEST, "INVALID_OAUTH_STATE", "O retorno OAuth não corresponde ao login iniciado", null);
    }

    @ExceptionHandler(BethaApiException.class)
    public ResponseEntity<ApiError> bethaError(final BethaApiException exception,
                                               final HttpServletRequest request) {
        final HttpStatus status = HttpStatus.resolve(exception.getStatus());
        final HttpStatus responseStatus = (status == null || status == HttpStatus.UNAUTHORIZED)
            ? HttpStatus.BAD_GATEWAY
            : status;
        LOGGER.warn("Integração Betha falhou em {} {}: HTTP {}, code={}, restrictionType={}, message={}",
            request.getMethod(), request.getRequestURI(), exception.getStatus(), exception.getCode(),
            exception.getRestrictionType(), exception.getMessage());
        return response(responseStatus,
            exception.getCode(), exception.getMessage(), exception.getRestrictionType());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> invalidInput(final IllegalArgumentException exception) {
        return response(HttpStatus.BAD_REQUEST, "INVALID_INPUT", exception.getMessage(), null);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> unexpected(final Exception exception,
                                               final HttpServletRequest request) {
        LOGGER.error("Erro inesperado em {} {}", request.getMethod(), request.getRequestURI(), exception);
        return response(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR",
            "Ocorreu um erro inesperado ao processar a requisição", null);
    }

    private static ResponseEntity<ApiError> response(final HttpStatus status,
                                                     final String code,
                                                     final String message,
                                                     final String restrictionType) {
        return ResponseEntity.status(status).body(new ApiError(code, message, restrictionType));
    }
}
