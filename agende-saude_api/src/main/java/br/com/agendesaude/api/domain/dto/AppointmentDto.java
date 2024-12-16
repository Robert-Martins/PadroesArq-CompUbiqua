package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.model.Appointment;
import br.com.agendesaude.api.domain.model.Consultation;
import br.com.agendesaude.api.domain.model.Screening;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentDto extends BaseEntityDto<Appointment> {

  private Consultation consultation;

  private Screening screening;

  @NotBlank
  private String notes;

  @NotNull
  private AppointmentStatusType status;

  public AppointmentDto() {
  }

  public AppointmentDto(Appointment appointment) {
    this.setId(appointment.getId());
    this.setConsultation(appointment.getConsultation());
    this.setScreening(appointment.getScreening());
    this.setNotes(appointment.getNotes());
    this.setStatus(appointment.getStatus());
    this.setCreatedAt(appointment.getCreatedAt());
    this.setUpdatedAt(appointment.getUpdatedAt());
  }

  @Override
  public Appointment mapDtoToEntity() {
    Appointment appointment = new Appointment();
    appointment.setId(this.getId());
    appointment.setConsultation(this.getConsultation());
    appointment.setScreening(this.getScreening());
    appointment.setNotes(this.getNotes());
    appointment.setStatus(this.getStatus());
    appointment.setCreatedAt(this.getCreatedAt());
    appointment.setUpdatedAt(this.getUpdatedAt());
    return appointment;
  }
}
