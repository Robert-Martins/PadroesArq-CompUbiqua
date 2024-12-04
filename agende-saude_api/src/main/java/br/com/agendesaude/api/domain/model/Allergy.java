package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.enums.SeverityType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "agende_allergy")
@Getter
@Setter
public class Allergy extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    @Column(nullable = false, length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    private SeverityType severity;

    @Override
    public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
        return null;
    }
}
