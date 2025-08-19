package com.betha.client.dto;

import java.util.UUID;

public record StatusReportComando (UUID id, String credential, Action action, DataPayload data) {
    public enum Action { STATUS_REPORT }
    public record DataPayload (UUID changesetId, ReportStatus status, String details, String reason) {}
    public enum ReportStatus { SUCCESS, FAILURE }
}
