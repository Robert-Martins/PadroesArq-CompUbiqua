package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.ScreeningStatus;
import br.com.agendesaude.api.domain.model.Appointment;
import br.com.agendesaude.api.domain.model.Screening;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScreeningDto extends BaseEntityDto<Screening> {

  @NotNull
  private List<ScreeningQuestionnaireAnswerDto> questionnaire;

  @NotNull
  private Appointment appointment;

  @NotBlank
  private String notes;

  @NotBlank
  private String status;

  private String classification;

  private String justification;

  public ScreeningDto() {
  }

  public ScreeningDto(Screening screening) {
    this.setId(screening.getId());
    this.setQuestionnaire(
        ScreeningQuestionnaireAnswerDto.fromMap(screening.getQuestionnaire()));
    this.setNotes(screening.getNotes());
    this.setClassification(screening.getClassification());
    this.setJustification(screening.getJustification());
    this.setStatus(screening.getStatus() != null ? screening.getStatus().name() : null);
    this.setCreatedAt(screening.getCreatedAt());
    this.setUpdatedAt(screening.getUpdatedAt());
  }

  @Override
  public Screening mapDtoToEntity() {
    Screening screening = new Screening();
    screening.setId(this.getId());
    screening.setQuestionnaire(
        this.questionnaire != null ? ScreeningQuestionnaireAnswerDto.toMap(this.getQuestionnaire()) :
            null);
    screening.setNotes(this.getNotes());
    screening.setClassification(this.getClassification());
    screening.setJustification(this.getJustification());
    screening.setStatus(this.getStatus() != null ? ScreeningStatus.valueOf(this.getStatus()) : null);
    screening.setCreatedAt(this.getCreatedAt());
    screening.setUpdatedAt(this.getUpdatedAt());
    return screening;
  }
}
