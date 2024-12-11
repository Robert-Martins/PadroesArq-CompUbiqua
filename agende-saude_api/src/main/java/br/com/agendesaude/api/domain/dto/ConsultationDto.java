package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.ConsultationType;
import br.com.agendesaude.api.domain.model.Consultation;
import br.com.agendesaude.api.domain.model.Location;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ConsultationDto extends BaseEntityDto<Consultation> {

    private Location location;
    private String responsibleDoctor;
    private ConsultationType type;
    private String specialty;
    private LocalDateTime date;

    public ConsultationDto() {}

    public ConsultationDto(Consultation consultation) {
        this.setId(consultation.getId());
        this.setLocation(consultation.getLocation());
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
        consultation.setLocation(this.getLocation());
        consultation.setResponsibleDoctor(this.getResponsibleDoctor());
        consultation.setType(this.getType());
        consultation.setSpecialty(this.getSpecialty());
        consultation.setDate(this.getDate());
        consultation.setCreatedAt(this.getCreatedAt());
        consultation.setUpdatedAt(this.getUpdatedAt());
        return consultation;
    }
}
