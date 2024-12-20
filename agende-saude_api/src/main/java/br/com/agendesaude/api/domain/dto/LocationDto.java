package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.model.Location;
import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDto extends BaseEntityDto<Location> {

  @NotNull
  private User user;

  @NotBlank
  private String name;

  private Boolean acceptsEmergencies;

  private Media thumbnail;

  private BigDecimal distance;

  @Override
  public Location mapDtoToEntity() {
    Location location = new Location();
    location.setId(this.getId());
    location.setName(this.getName());
    location.setUser(this.getUser());
    location.setAcceptsEmergencies(this.acceptsEmergencies != null ? this.acceptsEmergencies : false);
    location.setThumbnail(this.getThumbnail());
    location.setCreatedAt(this.getCreatedAt());
    location.setUpdatedAt(this.getUpdatedAt());
    return location;
  }
}
