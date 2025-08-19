package com.betha;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry
public class PessoasApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(PessoasApiApplication.class, args);
    }
}