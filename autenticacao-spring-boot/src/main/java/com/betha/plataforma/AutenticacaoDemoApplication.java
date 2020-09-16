package com.betha.plataforma;

import com.betha.plataforma.auth.BethaAuthenticationHandler;
import com.betha.plataforma.auth.CallbackFilter;
import com.betha.plataforma.auth.LoginFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@EnableFeignClients
@SpringBootApplication
public class AutenticacaoDemoApplication {

    private final BethaAuthenticationHandler authenticationHandler;

    public AutenticacaoDemoApplication(final BethaAuthenticationHandler authenticationHandler) {
        this.authenticationHandler = authenticationHandler;
    }

    public static void main(String[] args) {
        SpringApplication.run(AutenticacaoDemoApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean<LoginFilter> loginFilter() {
        final FilterRegistrationBean<LoginFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new LoginFilter(authenticationHandler));
        registrationBean.addUrlPatterns("/conta-usuario");
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<CallbackFilter> callbackFilter() {
        final FilterRegistrationBean<CallbackFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CallbackFilter(authenticationHandler));
        registrationBean.addUrlPatterns("/callback");
        return registrationBean;
    }


}
