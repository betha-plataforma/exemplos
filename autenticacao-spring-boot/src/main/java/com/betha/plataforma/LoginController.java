package com.betha.plataforma;

import com.betha.plataforma.auth.BethaAuthenticationHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class LoginController {

    private final BethaAuthenticationHandler bethaAuthenticationHandler;

    public LoginController(final BethaAuthenticationHandler bethaAuthenticationHandler) {
        this.bethaAuthenticationHandler = bethaAuthenticationHandler;
    }

    @GetMapping(value = {"/", "/login"})
    public String paginaLogin() {
        return "usuario/login";
    }

    @PostMapping(value = {"/login/betha"})
    public void redirecionarLoginBetha(final HttpServletRequest request, final HttpServletResponse response)
            throws IOException {

        bethaAuthenticationHandler.redirectLogin(request, response);
    }

}
