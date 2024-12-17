package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.LocationDto;
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
  public LocationDto mapEntityToDto() {
    LocationDto locationDto = new LocationDto();
    locationDto.setId(this.getId());
    locationDto.setName(this.getName());
    locationDto.setAccessEmergencies(this.isAccessEmergencies());
    locationDto.setUser(this.getUser());
    locationDto.setThumbnail(this.getThumbnail());
    locationDto.setAddress(this.getAddress());
    locationDto.setCreatedAt(this.getCreatedAt());
    locationDto.setUpdatedAt(this.getUpdatedAt());
    return locationDto;
  }

}
