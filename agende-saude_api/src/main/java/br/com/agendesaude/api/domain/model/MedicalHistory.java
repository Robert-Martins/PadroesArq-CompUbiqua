package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "agende_medical_history")
@Getter
@Setter
public class MedicalHistory extends BaseEntity {

    @Column(nullable = false, length = 255)
    private String condition;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Override
    public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
        return null;
    }
}
