package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.model.Appointment;
import br.com.agendesaude.api.domain.model.Consultation;
import br.com.agendesaude.api.domain.model.Person;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AppointmentDto extends BaseEntityDto<Appointment> {

    private Person person;
    private Consultation consultation;
    private LocalDateTime date;
    private String notes;
    private AppointmentStatusType status;

    public AppointmentDto() {}

    public AppointmentDto(Appointment appointment) {
        this.setId(appointment.getId());
        this.setPerson(appointment.getPerson());
        this.setConsultation(appointment.getConsultation());
        this.setDate(appointment.getDate());
        this.setNotes(appointment.getNotes());
        this.setStatus(appointment.getStatus());
        this.setCreatedAt(appointment.getCreatedAt());
        this.setUpdatedAt(appointment.getUpdatedAt());
    }

    @Override
    public Appointment mapDtoToEntity() {
        Appointment appointment = new Appointment();
        appointment.setId(this.getId());
        appointment.setPerson(this.getPerson());
        appointment.setConsultation(this.getConsultation());
        appointment.setDate(this.getDate());
        appointment.setNotes(this.getNotes());
        appointment.setStatus(this.getStatus());
        appointment.setCreatedAt(this.getCreatedAt());
        appointment.setUpdatedAt(this.getUpdatedAt());
        return appointment;
    }
}
