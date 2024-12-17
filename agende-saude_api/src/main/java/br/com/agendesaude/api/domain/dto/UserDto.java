package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.AccessLevelType;
import br.com.agendesaude.api.domain.enums.UserType;
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

  private UserType userType;
  private AccessLevelType accessLevelType;
  private Boolean isActive = true;

  public UserDto() {
  }

  public UserDto (User user) {
    this.setId(user.getId());
    this.setEmail(user.getEmail());
    this.setTaxId(user.getTaxId());
    this.setPassword(user.getPassword());
    this.setUserType(user.getType());
    this.setAccessLevelType(user.getAccessLevel());
    this.setIsActive(user.isActive());
    this.setCreatedAt(user.getCreatedAt());
    this.setUpdatedAt(user.getUpdatedAt());
  }


  @Override
  public User mapDtoToEntity() {
    User user = new User();
    user.setId(this.getId());
    user.setEmail(this.getEmail());
    user.setTaxId(this.getTaxId());
    user.setPassword(this.getPassword());
    user.setType(this.getUserType());
    user.setAccessLevel(this.getAccessLevelType());
    user.setActive(this.getIsActive());
    user.setCreatedAt(this.getCreatedAt());
    user.setUpdatedAt(this.getUpdatedAt());
    return user;
  }
}
