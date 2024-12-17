package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.ConsultationType;
import br.com.agendesaude.api.domain.model.Consultation;
import br.com.agendesaude.api.domain.model.Location;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConsultationDto extends BaseEntityDto<Consultation> {

  private LocationDto location;

  @NotBlank
  private String responsibleDoctor;

  private ConsultationType type;

  @NotNull
  private String specialty;

  @NotNull
  private LocalDateTime date;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public ConsultationDto() {
  }

  public ConsultationDto(Consultation consultation) {
    this.setId(consultation.getId());
    this.setLocation(consultation.getLocation().mapEntityToDto());
    this.setResponsibleDoctor(consultation.getResponsibleDoctor());
    this.setType(consultation.getType());
    this.setSpecialty(consultation.getSpecialty());
    this.setDate(consultation.getDate());
    this.setCreatedAt(consultation.getCreatedAt());
    this.setUpdatedAt(consultation.getUpdatedAt());
  }

  @Override
  public Consultation mapDtoToEntity() {
    Consultation consultation = new Consultation();
    consultation.setId(this.getId());
    consultation.setLocation(this.getLocation().mapDtoToEntity());
    consultation.setResponsibleDoctor(this.getResponsibleDoctor());
    consultation.setType(this.getType());
    consultation.setSpecialty(this.getSpecialty());
    consultation.setDate(this.getDate());
    consultation.setCreatedAt(this.getCreatedAt());
    consultation.setUpdatedAt(this.getUpdatedAt());
    return consultation;
  }
}
