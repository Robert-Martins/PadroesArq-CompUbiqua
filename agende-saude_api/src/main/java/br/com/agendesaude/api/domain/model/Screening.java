package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.ScreeningDto;
import br.com.agendesaude.api.infra.base.BaseEntity;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "agende_screening")
@Getter
@Setter
public class Screening extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "appointment_id", nullable = false)
  private Appointment appointment;

  @Type(JsonType.class)
  @Column(nullable = false, columnDefinition = "jsonb")
  private Map<String, Boolean> questionnaire;

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Override
  public ScreeningDto mapEntityToDto() {
    ScreeningDto dto = new ScreeningDto();
    dto.setId(this.getId());
    dto.setQuestionnaire(this.getQuestionnaire());
    dto.setNotes(this.getNotes());

    if (this.getAppointment() != null) {
      dto.setAppointment(this.getAppointment());
    }

    dto.setCreatedAt(this.getCreatedAt());
    dto.setUpdatedAt(this.getUpdatedAt());
    return dto;
  }
}
