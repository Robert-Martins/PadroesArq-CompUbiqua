package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.UserDto;
import br.com.agendesaude.api.domain.enums.AccessLevelType;
import br.com.agendesaude.api.domain.enums.UserType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Collection;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "agende_user")
@Getter
@Setter
public class User extends BaseEntity implements UserDetails {

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "address_id", nullable = false)
  private Address address;

  @Column(nullable = false, unique = true, length = 255)
  private String email;

  @Column(nullable = false, unique = true, length = 11)
  private String taxId;

  @Column(nullable = false, length = 255)
  private String password;

  @Column(length = 15)
  private String phone;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private UserType type;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private AccessLevelType accessLevel = AccessLevelType.BASIC;

  @Column(nullable = false)
  private boolean isActive = true;

  @Override
  public UserDto mapEntityToDto() {
    UserDto userDto = new UserDto();
    userDto.setId(this.getId());
    userDto.setEmail(this.getEmail());
    userDto.setPhone(this.getPhone());
    userDto.setTaxId(this.getTaxId());
    userDto.setAddress(this.getAddress());
    userDto.setUserType(this.getType());
    userDto.setAccessLevelType(this.getAccessLevel());
    userDto.setIsActive(this.isActive());
    userDto.setCreatedAt(this.getCreatedAt());
    userDto.setUpdatedAt(this.getUpdatedAt());
    return userDto;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public String getUsername() {
    return "";
  }

  @Override
  public boolean isAccountNonExpired() {
    return UserDetails.super.isAccountNonExpired();
  }

  @Override
  public boolean isAccountNonLocked() {
    return UserDetails.super.isAccountNonLocked();
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return UserDetails.super.isCredentialsNonExpired();
  }

  @Override
  public boolean isEnabled() {
    return UserDetails.super.isEnabled();
  }
}
