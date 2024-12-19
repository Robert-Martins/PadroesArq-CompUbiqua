package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.enums.ConsultationType;
import br.com.agendesaude.api.domain.model.Appointment;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

  Page<Appointment> findByStatus(AppointmentStatusType status, Pageable pageable);

  @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
      "FROM Appointment a WHERE a.consultation.id = :consultationId AND a.status = :status")
  boolean existsByConsultationIdAndStatus(@Param("consultationId") Long consultationId,
      @Param("status") AppointmentStatusType status);

  @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
      "FROM Appointment a " +
      "JOIN a.consultation c " +
      "WHERE a.person.id = :personId " +
      "AND c.type = :consultationType " +
      "AND a.status = :appointmentStatus")
  boolean existsEmergencyScheduledAppointment(@Param("personId") Long personId,
      @Param("consultationType") ConsultationType consultationType,
      @Param("appointmentStatus") AppointmentStatusType appointmentStatus);


  @Query("SELECT a FROM Appointment a " +
      "WHERE a.person.id = :personId " +
      "AND a.status = :status " +
      "AND a.consultation.date > :now " +
      "ORDER BY a.consultation.date ASC")
  List<Appointment> findNextAppointments(@Param("now") LocalDateTime now,
      @Param("personId") Long personId,
      @Param("status") AppointmentStatusType status,
      Pageable pageable);

  @Query("SELECT a FROM Appointment a " +
      "WHERE a.status = 'SCHEDULED' " +
      "AND a.consultation.type = 'EMERGENCY'" +
      "AND a.person.id = :personId "
  )
  List<Appointment> findScheduledEmergencyAppointments(@Param("personId") Long personId);

}
