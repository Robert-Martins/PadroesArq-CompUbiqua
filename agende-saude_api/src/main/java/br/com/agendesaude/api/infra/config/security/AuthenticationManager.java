package br.com.agendesaude.api.infra.config.security;

import br.com.agendesaude.api.domain.service.UserService;
import br.com.agendesaude.api.infra.exception.CustomException;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Primary
@Component
public class AuthenticationManager implements org.springframework.security.authentication.AuthenticationManager {

  private final UserService userService;

  public AuthenticationManager(UserService userService) {
    this.userService = userService;
  }

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {

    UserDetails userDetails = userService.loadUserByUsername(authentication.getName());

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    if (userDetails == null) {
      throw new CustomException("Usuário não encontrado!");
    }
    if (!bCryptPasswordEncoder.matches(authentication.getCredentials().toString(), userDetails.getPassword())) {
      throw new CustomException("Senha inválida!");
    }
    if (!userDetails.isEnabled()) {
      throw new CustomException("Usuário desabilitado!");
    }
    if (!userDetails.isAccountNonLocked()) {
      throw new CustomException("Usuário bloqueado!");
    }

    return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
  }
}
