package com.betha.plataforma;

import com.betha.plataforma.auth.BethaAuthenticationHandler;
import com.betha.plataforma.auth.OauthToken;
import com.betha.plataforma.auth.Usuario;
import com.betha.plataforma.auth.UsuarioApi;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@Controller
public class ContaUsuarioController {

    private final UsuarioApi usuarioApi;
    private final BethaAuthenticationHandler authenticationHandler;

    public ContaUsuarioController(final UsuarioApi usuarioApi,
                                  final BethaAuthenticationHandler authenticationHandler) {

        this.usuarioApi = usuarioApi;
        this.authenticationHandler = authenticationHandler;
    }

    @GetMapping({"conta-usuario"})
    public String visaoGeral(final HttpSession session, final Model model) {

        final OauthToken oauthToken = authenticationHandler.getPresentTokenFromSession(session);
        final Usuario usuario = usuarioApi.getInformacoesUsuario(oauthToken.getAccessToken());

        model.addAttribute("usuario", usuario);
        model.addAttribute("foto", String.format("%s?access_token=%s", usuario.getFoto(), oauthToken.getAccessToken()));

        return "usuario/conta-usuario";
    }


}
