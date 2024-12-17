package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.domain.model.Screening;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScreeningRepository extends JpaRepository<Screening, Long> {
}
