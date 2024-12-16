package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "agende_location")
@Getter
@Setter
public class Location extends BaseEntity {

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private boolean accessEmergencies;

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "thumbnail_id")
  private Media thumbnail;

  @ManyToOne
  @JoinColumn(name = "address_id", nullable = false)
  private Address address;

  @Override
  public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
    return null;
  }
}
