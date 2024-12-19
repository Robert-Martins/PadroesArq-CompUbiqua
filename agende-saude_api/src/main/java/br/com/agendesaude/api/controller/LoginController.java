package br.com.agendesaude.api.controller;


import br.com.agendesaude.api.domain.dto.LoginDto;
import br.com.agendesaude.api.domain.dto.TokenDto;
import br.com.agendesaude.api.domain.service.TokenService;
import br.com.agendesaude.api.infra.config.security.AuthenticationManager;
import br.com.agendesaude.api.infra.config.security.jwt.TokenProvider;
import br.com.agendesaude.api.infra.exception.ValidationException;
import br.com.agendesaude.api.infra.utils.StringUtil;
import java.util.HashMap;
import java.util.Map;
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
  private final TokenService tokenService;

  public LoginController(AuthenticationManager authenticationManager, TokenProvider tokenProvider,
      TokenService tokenService) {
    this.authenticationManager = authenticationManager;
    this.tokenProvider = tokenProvider;
    this.tokenService = tokenService;
  }

  @PostMapping("/login")
  public Map<String, String> login(@RequestBody LoginDto loginDto) throws ValidationException {
    var taxId = StringUtil.trimLowerCase(loginDto.getTaxId());
    var authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getTaxId(),
        loginDto.getPassword());
    try {
      this.authenticationManager.authenticate(authenticationToken);
      String accessToken = this.tokenProvider.createAccessToken(taxId, "user");
      String refreshToken = this.tokenProvider.createRefreshToken(taxId);

      Map<String, String> tokens = new HashMap<>();
      tokens.put("accessToken", accessToken);
      tokens.put("refreshToken", refreshToken);
      return tokens;
    } catch (UsernameNotFoundException e) {
      throw new ValidationException("Usuário ou senha inválidos");
    }
  }

  @PostMapping("/refresh-token")
  public Map<String, String> refreshToken(@RequestBody Map<String, String> request) throws ValidationException {
    String refreshToken = request.get("refreshToken");

    if (this.tokenProvider.validateToken(refreshToken)) {
      String username = this.tokenProvider.getUsernameFromToken(refreshToken);
      String newAccessToken = this.tokenProvider.createAccessToken(username, "auth");

      Map<String, String> tokens = new HashMap<>();
      tokens.put("accessToken", newAccessToken);
      tokens.put("refreshToken", refreshToken);
      return tokens;
    } else {
      throw new ValidationException("Refresh token inválido");
    }
  }

  @PostMapping("/password-reset-request")
  public void passwordResetFlow(@RequestBody TokenDto tokenDto) {
    tokenService.enviarEmail(tokenDto.getEmail());
  }

  @PostMapping("/password-reset")
  public void passwordReset(@RequestBody TokenDto tokenDto) {
    this.tokenService.resetPassword(tokenDto);
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
