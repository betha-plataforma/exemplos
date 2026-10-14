package com.betha.plataforma.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final BethaSessionAuthenticationFilter authenticationFilter;

    public SecurityConfig(final BethaSessionAuthenticationFilter authenticationFilter) {
        this.authenticationFilter = authenticationFilter;
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        final CookieCsrfTokenRepository csrfRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        csrfRepository.setCookiePath("/");

        final AuthenticationEntryPoint unauthorized = (request, response, exception) ->
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Sessão não autenticada");

        http
            .csrf().csrfTokenRepository(csrfRepository)
            .and()
            .authorizeRequests()
                .antMatchers("/", "/login", "/callback", "/error", "/favicon.ico", "/css/**", "/img/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .exceptionHandling().authenticationEntryPoint(unauthorized)
            .and()
            .addFilterBefore(authenticationFilter, AnonymousAuthenticationFilter.class);
    }
}
