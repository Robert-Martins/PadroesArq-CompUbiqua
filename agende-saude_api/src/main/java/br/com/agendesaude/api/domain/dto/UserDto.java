package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.AccessLevelType;
import br.com.agendesaude.api.domain.enums.UserType;
import br.com.agendesaude.api.domain.model.Address;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends BaseEntityDto<User> {

  @NotBlank
  private String email;

  @NotBlank
  private String password;

  @NotBlank
  private String taxId;

  private String phone;

  private Address address;

  private UserType userType;

  private AccessLevelType accessLevelType;

  private Boolean isActive = true;

  @Override
  public User mapDtoToEntity() {
    User user = new User();
    user.setId(this.getId());
    user.setEmail(this.getEmail());
    user.setTaxId(this.getTaxId());
    user.setPhone(this.getPhone());
    user.setAddress(this.getAddress());
    user.setPassword(this.getPassword());
    user.setType(this.getUserType());
    user.setAccessLevel(this.getAccessLevelType());
    user.setActive(this.getIsActive());
    user.setCreatedAt(this.getCreatedAt());
    user.setUpdatedAt(this.getUpdatedAt());
    return user;
  }
}
