package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.ScreeningDto;
import br.com.agendesaude.api.domain.dto.ScreeningQuestionnaireAnswerDto;
import br.com.agendesaude.api.domain.enums.ScreeningStatus;
import br.com.agendesaude.api.infra.base.BaseEntity;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "agende_screening")
@Getter
@Setter
public class Screening extends BaseEntity {

  @Type(JsonType.class)
  @Column(columnDefinition = "jsonb")
  private Map<String, Boolean> questionnaire;

  @Enumerated(EnumType.STRING)
  private ScreeningStatus status;

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Column
  private String classification;

  @Column
  private String justification;

  @Override
  public ScreeningDto mapEntityToDto() {
    if (this == null) {
      return null;
    }

    ScreeningDto screeningDto = new ScreeningDto();
    screeningDto.setId(this.getId());
    screeningDto.setQuestionnaire(
        this.getQuestionnaire() != null ?
            ScreeningQuestionnaireAnswerDto.fromMap(this.getQuestionnaire()) :
            new ArrayList<>()
    );
    screeningDto.setNotes(this.getNotes() != null ? this.getNotes() : "");
    screeningDto.setClassification(this.getClassification() != null ? this.getClassification() : "");
    screeningDto.setJustification(this.getJustification() != null ? this.getJustification() : "");
    screeningDto.setStatus(
        this.getStatus() != null ? this.getStatus().name() : null
    );

    screeningDto.setCreatedAt(this.getCreatedAt());
    screeningDto.setUpdatedAt(this.getUpdatedAt());

    return screeningDto;
  }


}
