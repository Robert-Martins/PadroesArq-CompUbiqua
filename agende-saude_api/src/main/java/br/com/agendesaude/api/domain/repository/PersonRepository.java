package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
    boolean existsByUserId(Long userId);
    boolean existsByCpf(String cpf);
}
