package com.betha.controller;

import org.hibernate.exception.ConstraintViolationException;
import org.postgresql.util.PSQLException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class DatabaseExceptionHandler {

    private static final Pattern PG_UNIQUE_DETAIL =
            Pattern.compile("Key \\((?<field>[^)]+)\\)=\\((?<value>[^)]+)\\)");

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrity(DataIntegrityViolationException ex) {
        Throwable root = getRootCause(ex);

        if (root instanceof ConstraintViolationException cex) {
            Throwable cause = getRootCause(cex);
            if (cause instanceof PSQLException psql) {
                return handlePSQL(psql, cex.getConstraintName());
            }
            return buildConflict("Violação de integridade de dados.", cex.getConstraintName(), null, null);
        }

        if (root instanceof PSQLException psql) {
            return handlePSQL(psql, null);
        }

        return buildConflict("Violação de integridade de dados.", null, null, null);
    }

    private ResponseEntity<Map<String, Object>> handlePSQL(PSQLException psql, String constraintFromHibernate) {
        String sqlState = psql.getSQLState();
        String message = psql.getMessage();
        String constraint = constraintFromHibernate;

        if ("23505".equals(sqlState)) {
            String userMessage = "Registro duplicado para um campo com restrição de unicidade.";
            String field = null;
            String value = null;

            Matcher m = PG_UNIQUE_DETAIL.matcher(message);
            if (m.find()) {
                field = m.group("field");
                value = m.group("value");
                userMessage = "Já existe um registro com " + field + " = " + value + ".";
            }

            if (constraint == null) {
                constraint = extractConstraintName(message);
            }

            return buildConflict(userMessage, constraint, field, value);
        }

        return buildConflict("Erro de banco de dados: " + (message != null ? message : "violação de integridade"), constraint, null, null);
    }

    private ResponseEntity<Map<String, Object>> buildConflict(String userMessage,
                                                              String constraint,
                                                              String field,
                                                              String value) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now().toString());
        body.put("status", HttpStatus.CONFLICT.value());
        body.put("error", HttpStatus.CONFLICT.getReasonPhrase());
        body.put("message", userMessage);
        if (constraint != null) body.put("constraint", constraint);
        if (field != null) body.put("field", field);
        if (value != null) body.put("value", value);

        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    private static String extractConstraintName(String message) {
        if (message == null) return null;
        int first = message.indexOf('"');
        int last = message.lastIndexOf('"');
        if (first >= 0 && last > first) {
            return message.substring(first + 1, last);
        }
        return null;
    }

    private static Throwable getRootCause(Throwable t) {
        Throwable result = t;
        while (result.getCause() != null && result.getCause() != result) {
            result = result.getCause();
        }
        return result;
    }
}
