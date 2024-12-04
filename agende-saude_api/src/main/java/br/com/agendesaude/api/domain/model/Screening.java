package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.util.Map;

@Entity
@Table(name = "agende_screening")
@Getter
@Setter
public class Screening extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    @Type(JsonType.class)
    @Column(nullable = false, columnDefinition = "jsonb")
    private Map<String, Boolean> questionnaire;

    @Override
    public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
        return null;
    }
}
