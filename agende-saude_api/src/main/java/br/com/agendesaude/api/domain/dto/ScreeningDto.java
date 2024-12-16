package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.model.Appointment;
import br.com.agendesaude.api.domain.model.Screening;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScreeningDto extends BaseEntityDto<Screening> {

  @NotNull
  private Appointment appointment;

  @NotNull
  private Map<String, Boolean> questionnaire;

  @NotBlank
  private String notes;

  public ScreeningDto() {
  }

  public ScreeningDto(Screening screening) {
    this.setId(screening.getId());
    this.setAppointment(screening.getAppointment());
    this.setQuestionnaire(screening.getQuestionnaire());
    this.setNotes(screening.getNotes());
    this.setCreatedAt(screening.getCreatedAt());
    this.setUpdatedAt(screening.getUpdatedAt());
  }

  @Override
  public Screening mapDtoToEntity() {
    Screening screening = new Screening();
    screening.setId(this.getId());
    screening.setAppointment(this.getAppointment());
    screening.setQuestionnaire(this.getQuestionnaire());
    screening.setNotes(this.getNotes());
    screening.setCreatedAt(this.getCreatedAt());
    screening.setUpdatedAt(this.getUpdatedAt());
    return screening;
  }
}
