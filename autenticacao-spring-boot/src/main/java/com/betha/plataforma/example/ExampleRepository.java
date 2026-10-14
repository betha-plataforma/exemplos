package com.betha.plataforma.example;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ExampleRepository {

    private final AtomicLong sequence = new AtomicLong(2);
    private final ConcurrentMap<Long, ExampleItem> items = new ConcurrentHashMap<>();

    public ExampleRepository() {
        items.put(1L, new ExampleItem(1L, "Registro de exemplo"));
        items.put(2L, new ExampleItem(2L, "Permissões controladas pela Betha"));
    }

    public List<ExampleItem> findAll() {
        final List<ExampleItem> result = new ArrayList<>(items.values());
        result.sort(Comparator.comparing(ExampleItem::getId));
        return result;
    }

    public ExampleItem create(final String description) {
        final long id = sequence.incrementAndGet();
        final ExampleItem item = new ExampleItem(id, description);
        items.put(id, item);
        return item;
    }

    public ExampleItem update(final long id, final String description) {
        if (!items.containsKey(id)) {
            return null;
        }
        final ExampleItem updated = new ExampleItem(id, description);
        items.put(id, updated);
        return updated;
    }

    public boolean delete(final long id) {
        return items.remove(id) != null;
    }
}
