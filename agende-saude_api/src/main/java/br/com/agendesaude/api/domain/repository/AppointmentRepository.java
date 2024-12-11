package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM Appointment a WHERE a.consultation.id = :consultationId AND a.status = :status")
    boolean existsByConsultationIdAndStatus(@Param("consultationId") Long consultationId,
                                            @Param("status") AppointmentStatusType status);
}
