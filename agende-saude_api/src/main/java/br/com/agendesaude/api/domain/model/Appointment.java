package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.AppointmentDto;
import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "agende_appointment")
@Getter
@Setter
public class Appointment extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "person_id", nullable = false)
  private Person person;

  @OneToOne
  @JoinColumn(name = "screening_id")
  private Screening screening;

  @ManyToOne
  @JoinColumn(name = "consultation_id", nullable = false)
  private Consultation consultation;

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private AppointmentStatusType status = AppointmentStatusType.SCHEDULED;

  @Override
  public AppointmentDto mapEntityToDto() {
    AppointmentDto appointmentDto = new AppointmentDto();
    appointmentDto.setId(this.getId());
    appointmentDto.setNotes(this.getNotes());
    appointmentDto.setStatus(this.getStatus());

    if (this.getConsultation() != null) {
      appointmentDto.setConsultation(this.getConsultation().mapEntityToDto());
    }

    if (this.getScreening() != null) {
      appointmentDto.setScreening(this.getScreening().mapEntityToDto());
    }

    return appointmentDto;
  }

}
