package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Consultation;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {

  @Query(value = """
    SELECT c
    FROM Consultation c
    WHERE (:responsibleDoctor IS NULL OR LOWER(c.responsibleDoctor) LIKE LOWER(CONCAT('%', :responsibleDoctor, '%')))
    AND (:specialty IS NULL OR LOWER(c.specialty) LIKE LOWER(CONCAT('%', :specialty, '%')))
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

  @Query(value = """
        SELECT c
        FROM Consultation c
        WHERE c.location.id = :locationId
        """)
  Page<Consultation> findAllByLocationId(@Param("locationId") Long locationId, Pageable pageable);

  @Query("SELECT c FROM Consultation c WHERE c.date BETWEEN :startDate AND :endDate")
  List<Consultation> findConsultationsWithinNext7Days(LocalDateTime startDate, LocalDateTime endDate);

  @Query("SELECT c FROM Consultation c WHERE " +
      "ST_Distance(POINT(c.location.user.address.longitude, c.location.user.address.latitude), POINT(:longitude, :latitude)) <= :radius")
  List<Consultation> findConsultationsNearLocation(BigDecimal latitude, BigDecimal longitude, double radius);


}


