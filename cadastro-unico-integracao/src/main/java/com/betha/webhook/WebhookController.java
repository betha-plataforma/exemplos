package com.betha.webhook;

import com.betha.client.CadastroUnicoClient;
import com.betha.client.dto.StatusReportComando;
import com.betha.model.Pessoa;
import com.betha.repository.PessoaRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/webhook/eventos")
public class WebhookController {

    private static final Logger LOG = LoggerFactory.getLogger(WebhookController.class);
    private static final String CLAIM_DATA = "data";

    private final String jwtSecret;
    private final String credentialToken;
    private final ObjectMapper objectMapper;
    private final PessoaRepository repository;
    private final CadastroUnicoClient cadastroUnicoClient;

    public WebhookController(@Value("${webhook.jwt-secret}") String jwtSecret,
                             @Value("${cadastro-unico.token}") String credentialToken,
                             ObjectMapper objectMapper,
                             PessoaRepository repository,
                             CadastroUnicoClient cadastroUnicoClient) {
        this.jwtSecret = jwtSecret;
        this.credentialToken = credentialToken;
        this.objectMapper = objectMapper;
        this.repository = repository;
        this.cadastroUnicoClient = cadastroUnicoClient;
    }

    @PostMapping
    public ResponseEntity<Void> receiveEvent(@RequestBody WebhookEventRequest request) {
        if (request == null || !StringUtils.hasText(request.getJwtSignature())) {
            LOG.warn("Requisição sem jwtSignature.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        final Claims claims;
        try {
            claims = parseClaims(request.getJwtSignature());
        } catch (JwtException e) {
            LOG.warn("JWT inválido: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        final Map<String, Object> dataMap = extractDataClaim(claims);
        if (dataMap == null || dataMap.isEmpty()) {
            LOG.warn("Claim 'data' ausente ou vazio no JWT.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        final UUID changesetId = parseUuidSafely(dataMap.get("changesetId"));

        try {
            final Pessoa incoming = objectMapper.convertValue(dataMap, Pessoa.class);
            upsertPessoa(incoming);

            sendStatusReport(changesetId, StatusReportComando.ReportStatus.SUCCESS, null);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            LOG.error("Falha ao processar evento do webhook: {}", e.getMessage(), e);
            sendStatusReport(changesetId, StatusReportComando.ReportStatus.FAILURE, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private Claims parseClaims(String jwt) throws JwtException {
        Jws<Claims> jws = Jwts.parserBuilder()
                .setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8))
                .build()
                .parseClaimsJws(jwt);
        return jws.getBody();
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> extractDataClaim(Claims claims) {
        Object raw = claims.get(CLAIM_DATA);
        if (raw == null) return null;
        if (raw instanceof Map) {
            return (Map<String, Object>) raw;
        }
        return objectMapper.convertValue(raw, new TypeReference<Map<String, Object>>() {});
    }

    private UUID parseUuidSafely(Object value) {
        if (value == null) return null;
        try {
            return UUID.fromString(value.toString());
        } catch (IllegalArgumentException ex) {
            LOG.warn("changesetId inválido: {}", value);
            return null;
        }
    }

    private void upsertPessoa(Pessoa incoming) {
        if (incoming == null) {
            throw new IllegalArgumentException("Payload 'Pessoa' não pode ser nulo.");
        }

        final UUID templateId = incoming.getTemplateId();
        final Optional<Pessoa> existente = templateId != null ? repository.findById(templateId) : Optional.empty();

        final Pessoa toSave = existente.map(p -> {
            p.setNome(incoming.getNome());
            p.setCpf(incoming.getCpf());
            p.setEmail(incoming.getEmail());
            p.setDataNascimento(incoming.getDataNascimento());
            return p;
        }).orElseGet(() -> {
            incoming.setId(UUID.randomUUID());
            return incoming;
        });

        repository.save(toSave);
    }

    private void sendStatusReport(UUID changesetId,
                                  StatusReportComando.ReportStatus status,
                                  String errorMessage) {
        try {
            final StatusReportComando statusReportComando = new StatusReportComando(
                    UUID.randomUUID(),
                    credentialToken,
                    StatusReportComando.Action.STATUS_REPORT,
                    new StatusReportComando.DataPayload(
                            changesetId,
                            status,
                            errorMessage,
                            null
                    )
            );
            cadastroUnicoClient.sendStatusCommand(statusReportComando);
        } catch (Exception ex) {
            LOG.error("Falha ao enviar StatusReportComando (status={} changesetId={}): {}",
                    status, changesetId, ex.getMessage(), ex);
        }
    }
}
