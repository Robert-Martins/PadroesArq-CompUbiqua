package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.model.MedicalHistory;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicalHistoryDto extends BaseEntityDto<MedicalHistory> {

  @NotBlank
  private String condition;

  private String details;

  public MedicalHistoryDto() {
  }

  public MedicalHistoryDto(MedicalHistory medicalHistory) {
    this.setId(medicalHistory.getId());
    this.setCondition(medicalHistory.getCondition());
    this.setDetails(medicalHistory.getDetails());
    this.setCreatedAt(medicalHistory.getCreatedAt());
    this.setUpdatedAt(medicalHistory.getUpdatedAt());
  }

  @Override
  public MedicalHistory mapDtoToEntity() {
    MedicalHistory medicalHistory = new MedicalHistory();
    medicalHistory.setId(this.getId());
    medicalHistory.setCondition(this.getCondition());
    medicalHistory.setDetails(this.getDetails());
    medicalHistory.setCreatedAt(this.getCreatedAt());
    medicalHistory.setUpdatedAt(this.getUpdatedAt());
    return medicalHistory;
  }
}
