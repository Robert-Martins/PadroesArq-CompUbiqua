package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Token;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {

  Optional<Token> findByToken(String token);

  Optional<Token> findByHash(String hash);

  List<Token> findAllByCreatedAtBefore(LocalDateTime localDateTime);

}
