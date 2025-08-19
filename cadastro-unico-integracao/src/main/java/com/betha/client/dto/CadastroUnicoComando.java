package com.betha.client.dto;

import java.util.Map;
import java.util.UUID;

public record CadastroUnicoComando(UUID id, Action action, Payload data) {

    public enum Action {
        UPDATE,
        UNSUBSCRIBE,
        STATUS_REPORT
    }

    public record Payload(String template, String aggregate, String id, String user, Map<String, Object> data) {
    }
}
