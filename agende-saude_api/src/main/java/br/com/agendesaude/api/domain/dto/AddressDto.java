package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.model.Address;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto extends BaseEntityDto<Address> {

  @NotNull
  private String address;

  @NotNull
  private String neighborhood;

  @NotNull
  private String city;

  @NotNull
  private String state;

  @NotNull
  private String zipcode;

  @NotNull
  private BigDecimal latitude;

  @NotNull
  private BigDecimal longitude;

  public AddressDto() {
  }

  public AddressDto(Address address) {
    this.setId(address.getId());
    this.setAddress(address.getAddress());
    this.setNeighborhood(address.getNeighborhood());
    this.setCity(address.getCity());
    this.setState(address.getState());
    this.setZipcode(address.getZipcode());
    this.setLatitude(address.getLatitude());
    this.setLongitude(address.getLongitude());
    this.setCreatedAt(address.getCreatedAt());
    this.setUpdatedAt(address.getUpdatedAt());
  }

  @Override
  public Address mapDtoToEntity() {
    Address address = new Address();
    address.setId(this.getId());
    address.setAddress(this.getAddress());
    address.setNeighborhood(this.getNeighborhood());
    address.setCity(this.getCity());
    address.setState(this.getState());
    address.setZipcode(this.getZipcode());
    address.setLatitude(this.getLatitude());
    address.setLongitude(this.getLongitude());
    address.setCreatedAt(this.getCreatedAt());
    address.setUpdatedAt(this.getUpdatedAt());
    return address;
  }
}
