package br.com.agendesaude.api.infra.config.security;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import br.com.agendesaude.api.infra.config.security.jwt.JwtFilter;
import br.com.agendesaude.api.infra.config.security.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@EnableWebSecurity
@Configuration
public class SecurityConfig {

  private final TokenProvider tokenProvider;

  public SecurityConfig(TokenProvider tokenProvider) {
    this.tokenProvider = tokenProvider;
  }

  @Bean
  @Order(1)
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    JwtFilter jwtFilter = new JwtFilter(this.tokenProvider);

    http.authorizeHttpRequests(authz -> authz
            .requestMatchers(HttpMethod.POST, "/person").permitAll()
            .requestMatchers("/auth/login", "/auth/refresh-token", "/auth/password-reset-request", "/auth/password-reset",
                "application/health", "application/enum-by-name/*",
                "/token/validate").permitAll()
            .anyRequest().authenticated()
        ).csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
