package com.betha.plataforma.api;

public class ApiError {

    private final String code;
    private final String message;
    private final String restrictionType;

    public ApiError(final String code, final String message, final String restrictionType) {
        this.code = code;
        this.message = message;
        this.restrictionType = restrictionType;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getRestrictionType() {
        return restrictionType;
    }
}
