package com.betha.plataforma.auth;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@FeignClient(name = "oauth", url = "${betha.services.oauth}")
public interface OauthApi {

    @RequestMapping(value = "/token", method = POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    OauthToken exchangeAuthorizationCode(final String parameters);

    @RequestMapping(value = "/token", method = POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    OauthToken refreshToken(final String parameters);
}
