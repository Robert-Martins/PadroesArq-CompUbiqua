package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.TokenDto;
import br.com.agendesaude.api.infra.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "agende_token")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Token extends BaseEntity {

  @Column(name = "token")
  private String token;

  @Column(name = "hash")
  private String hash;

  @Override
  public TokenDto mapEntityToDto() {
    TokenDto tokenDto = new TokenDto();
    tokenDto.setToken(this.token);
    tokenDto.setHash(this.hash);
    return tokenDto;
  }

}