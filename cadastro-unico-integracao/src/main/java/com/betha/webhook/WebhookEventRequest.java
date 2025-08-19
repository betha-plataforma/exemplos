package com.betha.webhook;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WebhookEventRequest {

    @JsonProperty("signature")
    private String jwtSignature;

    public String getJwtSignature() {
        return jwtSignature;
    }

    public void setJwtSignature(String jwtSignature) {
        this.jwtSignature = jwtSignature;
    }
}
