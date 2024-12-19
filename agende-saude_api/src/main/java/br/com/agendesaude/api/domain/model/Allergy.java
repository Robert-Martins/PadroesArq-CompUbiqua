package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.enums.SeverityType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "agende_allergy")
@Getter
@Setter
public class Allergy extends BaseEntity {

  @Column()
  private String description;

  @Enumerated(EnumType.STRING)
  private SeverityType severity;

  @Override
  public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
    return null;
  }
}
