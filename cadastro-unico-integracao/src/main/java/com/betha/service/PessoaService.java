package com.betha.service;

import com.betha.client.CadastroUnicoClient;
import com.betha.client.dto.CadastroUnicoComando;
import com.betha.model.Pessoa;
import com.betha.repository.PessoaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class PessoaService {

    private final static Logger LOGGER = LoggerFactory.getLogger(PessoaService.class);

    private final PessoaRepository repository;
    private final CadastroUnicoClient cadastroUnicoClient;

    public PessoaService(PessoaRepository repository, CadastroUnicoClient cadastroUnicoClient) {
        this.repository = repository;
        this.cadastroUnicoClient = cadastroUnicoClient;
    }

    public List<Pessoa> listAll() {
        return repository.findAll();
    }

    public Pessoa get(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public Pessoa save(Pessoa pessoa) {
        final Pessoa pessoaPersistida = repository.save(pessoa);
        sendCadastroUnicoCommand(pessoaPersistida);
        return pessoaPersistida;
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }

    public void sendCadastroUnicoCommand(Pessoa pessoa) {
        final CadastroUnicoComando.Payload payload = new CadastroUnicoComando.Payload(
                "pessoaexemplo",
                "pessoaexemplo",
                pessoa.getTemplateId().toString(),
                "anonymous",
                Map.of(
                        "nome", pessoa.getNome(),
                        "cpf", pessoa.getCpf(),
                        "email", pessoa.getEmail(),
                        "dataNascimento", pessoa.getDataNascimento()
                )
        );

        final UUID id = UUID.randomUUID();
        final CadastroUnicoComando comando = new CadastroUnicoComando(
                id,
                CadastroUnicoComando.Action.UPDATE,
                payload
        );

        LOGGER.info("Sending cadastro unico comando: {}", comando);

        this.cadastroUnicoClient.sendCommand(comando);
    }
}