package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
}
