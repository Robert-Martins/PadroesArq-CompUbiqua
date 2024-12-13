package br.com.agendesaude.api.infra.config.security.jwt;

import static java.util.Collections.emptyList;

import br.com.agendesaude.api.domain.service.UserService;

import br.com.agendesaude.api.infra.config.AppConfig;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.time.Instant;
import java.util.Base64;
import lombok.SneakyThrows;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class TokenProvider {

  private final long tokenValidityInMilliseconds;
  private final String secretKey;
  private final UserService userService;

  public TokenProvider(AppConfig config, UserService userService) {
    this.secretKey = Base64.getEncoder().encodeToString(config.getSecret().getBytes());
    this.tokenValidityInMilliseconds = 1000 * config.getTokenValidityInSeconds();
    this.userService = userService;
  }

  public String createToken(String email, String authentication) {
    final Instant now = Instant.now();
    final Instant expiresIn = now.plusMillis(tokenValidityInMilliseconds);

    return JWT.create()
        .withIssuer("agende_saude")
        .withSubject(email)
        .withClaim("auth", authentication)
        .withClaim("email", email)
        .withIssuedAt(now)
        .withExpiresAt(expiresIn)
        .sign(Algorithm.HMAC512(secretKey));
  }

  @SneakyThrows
  public Authentication getAuthentication(String token) {
    var decodedJWT = JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
    final String email = decodedJWT.getSubject();
    final String auth = decodedJWT.getClaim("auth").asString();
    UserDetails userDetails = null;

    if (auth.equals("user")) {
      userDetails = userService.loadUserByUsername(email);
    }

    return new UsernamePasswordAuthenticationToken(userDetails, "", emptyList());
  }

  public boolean isTokenValido(String jwt) {
    try {
      var token = JWT.require(Algorithm.HMAC512(secretKey)).build()
          .verify(jwt)
          .getToken();
      return token != null;
    } catch (Exception e) {
      return false;
    }
  }
}
