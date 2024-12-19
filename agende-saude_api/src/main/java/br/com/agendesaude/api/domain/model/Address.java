package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "agende_address")
@Getter
@Setter
public class Address extends BaseEntity {

  @Column()
  private String address;

  @Column()
  private String neighborhood;

  @Column()
  private String city;

  @Column()
  private String state;

  @Column()
  private String zipcode;

  @Column(nullable = false, precision = 10, scale = 6)
  private BigDecimal latitude;

  @Column(nullable = false, precision = 10, scale = 6)
  private BigDecimal longitude;

  @Override
  public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
    return null;
  }
}
