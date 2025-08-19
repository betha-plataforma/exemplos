package com.betha.controller;

import com.betha.model.Pessoa;
import com.betha.service.PessoaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/pessoas")
public class PessoaController {

    private final PessoaService service;

    public PessoaController(PessoaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pessoa> list() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public Pessoa get(@PathVariable UUID id) {
        return service.get(id);
    }

    @PostMapping
    public Pessoa create(@RequestBody Pessoa pessoa) {
        if (pessoa.getId() == null) {
            pessoa.setId(UUID.randomUUID());
        }
        if (pessoa.getTemplateId() == null) {
            pessoa.setTemplateId(UUID.randomUUID());
        }
        return service.save(pessoa);
    }

    @PutMapping("/{id}")
    public Pessoa update(@PathVariable UUID id, @RequestBody Pessoa pessoa) {
        if (pessoa.getId() == null) {
            pessoa.setId(id);
        } else if (!pessoa.getId().equals(id)) {
            throw new IllegalArgumentException("ID in path and body do not match");
        }
        return service.save(pessoa);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}