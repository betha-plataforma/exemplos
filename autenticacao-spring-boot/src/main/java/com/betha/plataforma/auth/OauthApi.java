package com.betha.plataforma.auth;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@FeignClient(name = "oauth", url = "${betha.services.oauth}")
public interface OauthApi {

    @RequestMapping(value = "/token", method = POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    OauthToken exchangeAuthorizationCode(@RequestBody MultiValueMap<String, String> parameters);

    @RequestMapping(value = "/token", method = POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    OauthToken refreshToken(@RequestBody MultiValueMap<String, String> parameters);
}
