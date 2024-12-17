package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.ConsultationDto;
import br.com.agendesaude.api.domain.enums.ConsultationType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "agende_consultation")
@Getter
@Setter
public class Consultation extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "location_id", nullable = false)
  private Location location;

  @Column(nullable = false)
  private String responsibleDoctor;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ConsultationType type = ConsultationType.COMMON;

  @Column(nullable = false)
  private String specialty;

  @Column(nullable = false)
  private LocalDateTime date;

  @Override
  public ConsultationDto mapEntityToDto() {
    ConsultationDto dto = new ConsultationDto();
    dto.setId(this.getId());
    dto.setResponsibleDoctor(this.getResponsibleDoctor());
    dto.setType(this.getType());
    dto.setSpecialty(this.getSpecialty());
    dto.setDate(this.getDate());
    return dto;
  }

}
