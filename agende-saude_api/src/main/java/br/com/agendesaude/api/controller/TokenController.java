package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.TokenDto;
import br.com.agendesaude.api.domain.service.TokenService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
@CrossOrigin
public class TokenController {

  private final TokenService tokenService;

  public TokenController(TokenService tokenService) {
    this.tokenService = tokenService;
  }

  @PostMapping("/validate")
  public TokenDto validateToken(@RequestBody TokenDto tokenDto) {
    return this.tokenService.validateToken(tokenDto.getToken());
  }
}
