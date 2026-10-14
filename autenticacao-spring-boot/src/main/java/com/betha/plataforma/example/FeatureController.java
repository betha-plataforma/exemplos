package com.betha.plataforma.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
public class FeatureController {

    @GetMapping("/api/menu2")
    public Map<String, String> menu2() {
        return Collections.singletonMap("message", "Consulta da funcionalidade Menu 2 autorizada pela Betha.");
    }

    @GetMapping("/api/menu3")
    public Map<String, String> menu3() {
        return Collections.singletonMap("message", "Consulta da funcionalidade Menu 3 autorizada pela Betha.");
    }
}
