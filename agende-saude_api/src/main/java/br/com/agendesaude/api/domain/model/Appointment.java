package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
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
  @JoinColumn(name = "screening_id", nullable = false)
  private Screening screening;

  @ManyToOne
  @JoinColumn(name = "consultation_id", nullable = false)
  private Consultation consultation;

  @Column(nullable = false)
  private LocalDateTime date;

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private AppointmentStatusType status = AppointmentStatusType.SCHEDULED;

  @Override
  public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
    return null;
  }
}
