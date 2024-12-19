package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.model.Token;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenDto extends BaseEntityDto<Token> {

  private String token;

  private String hash;

  private String email;

  private String newPassword;


  public TokenDto() {
  }

  public TokenDto(Token token) {
    this.setId(token.getId());
    this.setToken(token.getToken());
    this.setHash(token.getHash());
    this.setCreatedAt(token.getCreatedAt());
    this.setUpdatedAt(token.getUpdatedAt());
  }

  @Override
  public Token mapDtoToEntity() {
    Token token = new Token();
    token.setId(this.getId());
    token.setToken(this.token);
    token.setHash(this.hash);
    token.setCreatedAt(this.getCreatedAt());
    token.setUpdatedAt(this.getUpdatedAt());
    return token;
  }
}
