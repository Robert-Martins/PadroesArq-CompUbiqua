package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.model.Appointment;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentDto extends BaseEntityDto<Appointment> {

  private ConsultationDto consultation;

  private ScreeningDto screening;

  @NotBlank
  private String notes;

  @NotNull
  private AppointmentStatusType status;

  public AppointmentDto() {
  }

  public AppointmentDto(Appointment appointment) {
    this.setId(appointment.getId());
    this.setConsultation(appointment.getConsultation().mapEntityToDto());
    this.setScreening(
        appointment.getScreening() != null && appointment.getScreening().getId() != null ? appointment.getScreening()
            .mapEntityToDto() : null);
    this.setNotes(appointment.getNotes());
    this.setStatus(appointment.getStatus());
    this.setCreatedAt(appointment.getCreatedAt());
    this.setUpdatedAt(appointment.getUpdatedAt());
  }

  @Override
  public Appointment mapDtoToEntity() {
    Appointment appointment = new Appointment();
    appointment.setId(this.getId());
    appointment.setConsultation(this.getConsultation().mapDtoToEntity());
    appointment.setScreening(this.getScreening().mapDtoToEntity());
    appointment.setNotes(this.getNotes());
    appointment.setStatus(this.getStatus());
    appointment.setCreatedAt(this.getCreatedAt());
    appointment.setUpdatedAt(this.getUpdatedAt());
    return appointment;
  }
}
