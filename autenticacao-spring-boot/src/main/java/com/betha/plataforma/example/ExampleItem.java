package com.betha.plataforma.example;

public class ExampleItem {

    private Long id;
    private String description;

    public ExampleItem() {
    }

    public ExampleItem(final Long id, final String description) {
        this.id = id;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
