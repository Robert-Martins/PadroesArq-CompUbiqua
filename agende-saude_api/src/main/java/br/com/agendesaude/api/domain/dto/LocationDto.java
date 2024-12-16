package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.model.Address;
import br.com.agendesaude.api.domain.model.Location;
import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDto extends BaseEntityDto<Location> {

  @NotBlank
  private String name;

  @NotNull
  private User user;

  private Boolean accessEmergencies;

  private Media thumbnail;
  private Address address;

  @Override
  public Location mapDtoToEntity() {
    Location location = new Location();
    location.setId(this.getId());
    location.setName(this.getName());
    location.setUser(this.getUser());
    location.setAccessEmergencies(this.accessEmergencies != null ? this.accessEmergencies : false);
    location.setThumbnail(this.getThumbnail());
    location.setAddress(this.getAddress());
    location.setCreatedAt(this.getCreatedAt());
    location.setUpdatedAt(this.getUpdatedAt());
    return location;
  }
}
