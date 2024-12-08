package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.enums.ConsultationType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "agende_consultation")
@Getter
@Setter
public class Consultation extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @Column(nullable = false)
    private String responsibleDoctor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConsultationType type = ConsultationType.COMMON;

    @Column(nullable = false)
    private String specialty;

    @Column(nullable = false)
    private LocalDateTime date;

    @Override
    public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
        return null;
    }
}
