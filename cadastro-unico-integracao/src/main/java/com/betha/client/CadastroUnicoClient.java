package com.betha.client;

import com.betha.client.dto.CadastroUnicoComando;
import com.betha.client.dto.StatusReportComando;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class CadastroUnicoClient {

    private final RestTemplate rest;
    private final String baseUrl;
    private final HttpHeaders headers;

    public CadastroUnicoClient(RestTemplate rest,
                               @Value("${cadastro-unico.base-url}") String baseUrl,
                               @Value("${cadastro-unico.token}") String token,
                               @Value("${cadastro-unico.user-access}") String userAccess) {
        this.rest = rest;
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.add("User-Access", userAccess);
        headers.setContentType(MediaType.APPLICATION_JSON);
    }

    @Retryable(backoff = @Backoff(delay = 2000))
    public void sendCommand(CadastroUnicoComando commandPayload) {
        HttpEntity<Object> request = new HttpEntity<>(commandPayload, headers);
        rest.postForEntity(baseUrl + "/api/v2/commands", request, Void.class);
    }

    @Retryable(backoff = @Backoff(delay = 2000))
    public void sendStatusCommand(StatusReportComando statusReportComando) {
        HttpEntity<Object> request = new HttpEntity<>(statusReportComando, headers);
        rest.postForEntity(baseUrl + "/api/v2/commands/status-report", request, Void.class);
    }
}