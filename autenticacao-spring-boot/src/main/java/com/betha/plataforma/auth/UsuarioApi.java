package com.betha.plataforma.auth;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "usuario", url = "${betha.services.usuarios}")
public interface UsuarioApi {

    @RequestMapping(method = RequestMethod.GET, path = "users/@me?access_token={access_token}")
    Usuario getInformacoesUsuario(@PathVariable("access_token") final String accessToken);

}
