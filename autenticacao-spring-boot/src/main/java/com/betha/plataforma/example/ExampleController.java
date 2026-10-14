package com.betha.plataforma.example;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/examples")
public class ExampleController {

    private final ExampleRepository repository;

    public ExampleController(final ExampleRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ExampleItem> findAll() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<ExampleItem> create(@RequestBody final ExampleItem input) {
        final String description = requireDescription(input);
        final ExampleItem created = repository.create(description);
        return ResponseEntity.created(URI.create("/api/examples/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExampleItem> update(@PathVariable final long id,
                                              @RequestBody final ExampleItem input) {
        final ExampleItem updated = repository.update(id, requireDescription(input));
        return updated == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final long id) {
        return repository.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    private static String requireDescription(final ExampleItem input) {
        if (input == null || input.getDescription() == null || input.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("A descrição é obrigatória");
        }
        return input.getDescription().trim();
    }
}
