package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByTaxId(String taxId);

  User findByEmail(String email);

  boolean existsByTaxId(String taxId);

  boolean existsByEmail(String email);

}
