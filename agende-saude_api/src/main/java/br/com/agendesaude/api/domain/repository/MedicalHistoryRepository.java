package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {

}
