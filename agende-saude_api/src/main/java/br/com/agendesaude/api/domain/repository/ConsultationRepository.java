package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Consultation;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {


  @Query(value = """
    SELECT c
    FROM Consultation c
    WHERE (:responsibleDoctor IS NULL OR lower(c.responsibleDoctor) LIKE %:responsibleDoctor%)
    AND (:specialty IS NULL OR lower(c.specialty) LIKE %:specialty%)
    AND (:startDate IS NULL OR c.date >= :startDate)
    AND (:endDate IS NULL OR c.date <= :endDate)
""")
  Page<Consultation> findConsultations(
      @Param("responsibleDoctor") String responsibleDoctor,
      @Param("specialty") String specialty,
      @Param("startDate") LocalDateTime startDate,
      @Param("endDate") LocalDateTime endDate,
      Pageable pageable
  );


}


