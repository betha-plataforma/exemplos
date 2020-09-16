package com.betha.plataforma.auth;

import com.betha.plataforma.auth.BethaAuthenticationHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class LoginController {

    private final BethaAuthenticationHandler authenticationHandler;

    public LoginController(final BethaAuthenticationHandler authenticationHandler) {
        this.authenticationHandler = authenticationHandler;
    }

    @GetMapping(value = {"/", "/login"})
    public String paginaLogin() {
        return "usuario/login";
    }

    @PostMapping(value = {"/login/betha"})
    public void redirecionarLoginBetha(final HttpServletRequest request, final HttpServletResponse response)
            throws IOException {

        authenticationHandler.redirectLogin(request, response);
    }

}
