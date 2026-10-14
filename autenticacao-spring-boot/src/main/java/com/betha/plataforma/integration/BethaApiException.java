package com.betha.plataforma.integration;

public class BethaApiException extends RuntimeException {

    private final int status;
    private final String code;
    private final String restrictionType;

    public BethaApiException(final int status,
                             final String code,
                             final String message,
                             final String restrictionType) {
        super(message);
        this.status = status;
        this.code = code;
        this.restrictionType = restrictionType;
    }

    public int getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getRestrictionType() {
        return restrictionType;
    }
}
