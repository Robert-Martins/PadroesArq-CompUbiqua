package br.com.agendesaude.api.controller;


import br.com.agendesaude.api.domain.dto.LoginDto;
import br.com.agendesaude.api.infra.config.security.AuthenticationManager;
import br.com.agendesaude.api.infra.config.security.jwt.TokenProvider;
import br.com.agendesaude.api.infra.utils.StringUtil;
import javax.xml.bind.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class LoginController {

  private final AuthenticationManager authenticationManager;
  private final TokenProvider tokenProvider;

  public LoginController(AuthenticationManager authenticationManager, TokenProvider tokenProvider) {
    this.authenticationManager = authenticationManager;
    this.tokenProvider = tokenProvider;
  }


  @PostMapping("/login")
  public String login(@RequestBody LoginDto loginDto) throws ValidationException {
    var taxId = StringUtil.trimLowerCase(loginDto.getTaxId());
    var authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getTaxId(),
        loginDto.getPassword());
    try {
      this.authenticationManager.authenticate(authenticationToken);
      return this.tokenProvider.createToken(taxId, "auth");
    } catch (UsernameNotFoundException e) {
      throw new ValidationException("Usuário ou senha inválidos");
    }
  }

  @GetMapping("/authenticate")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void authenticate() {
    // we don't have to do anything here
    // this is just a secure endpoint and the JWTFilter
    // validates the token
    // this service is called at startup of the app to check
    // if the jwt token is still valid
  }

}
