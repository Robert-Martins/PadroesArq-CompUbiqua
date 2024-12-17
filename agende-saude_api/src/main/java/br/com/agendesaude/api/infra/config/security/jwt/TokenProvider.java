package br.com.agendesaude.api.infra.config.security.jwt;

import static java.util.Collections.emptyList;

import br.com.agendesaude.api.domain.service.UserService;
import br.com.agendesaude.api.infra.config.AppConfig;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Base64;
import java.util.Date;
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
  private final Algorithm algorithm;

  public TokenProvider(AppConfig config, UserService userService) {
    this.secretKey = Base64.getEncoder().encodeToString(config.getSecret().getBytes());
    this.tokenValidityInMilliseconds = 1000 * config.getTokenValidityInSeconds();
    this.userService = userService;
    this.algorithm = Algorithm.HMAC512(secretKey);
  }

  public String createAccessToken(String username, String authentication) {
    return JWT.create()
        .withSubject(username)
        .withClaim("auth", authentication)
        .withIssuedAt(new Date())
        .withExpiresAt(new Date(System.currentTimeMillis() + (tokenValidityInMilliseconds * 24))) // 24 horas
        .sign(algorithm);
  }

  public String createRefreshToken(String username) {
    return JWT.create()
        .withSubject(username)
        .withIssuedAt(new Date())
        .withExpiresAt(new Date(System.currentTimeMillis() + (tokenValidityInMilliseconds * 48))) // 48 horas
        .sign(algorithm);
  }

  public boolean validateToken(String token) {
    try {
      JWTVerifier verifier = JWT.require(algorithm).build();
      verifier.verify(token);
      return true;
    } catch (JWTVerificationException e) {
      return false;
    }
  }

  public String getUsernameFromToken(String token) {
    DecodedJWT decodedJWT = JWT.require(algorithm).build().verify(token);
    return decodedJWT.getSubject();
  }

  @SneakyThrows
  public Authentication getAuthentication(String token) {
    var decodedJWT = JWT.require(algorithm).build().verify(token);
    final String taxId = decodedJWT.getSubject();
    final String auth = decodedJWT.getClaim("auth").asString();
    UserDetails userDetails = null;

    if (auth.equals("user")) {
      userDetails = userService.loadUserByUsername(taxId);
    }

    return new UsernamePasswordAuthenticationToken(userDetails, "", emptyList());
  }


  public boolean isTokenValid(String jwt) {
    try {
      var decodedJWT = JWT.require(algorithm).build().verify(jwt);
      return decodedJWT != null;
    } catch (Exception e) {
      return false;
    }
  }
}
