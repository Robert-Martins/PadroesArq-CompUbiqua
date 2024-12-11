package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
