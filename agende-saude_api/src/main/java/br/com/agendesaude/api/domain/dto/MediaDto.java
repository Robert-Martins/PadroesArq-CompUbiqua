package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MediaDto extends BaseEntityDto<Media> {

  @NotBlank
  private String filename;

  @NotNull
  private Long size;

  @NotBlank
  private String type;

  private String data;


  public MediaDto() {
  }

  public MediaDto(Media media) {
    this.setId(media.getId());
    this.setFilename(media.getFilename());
    this.setSize(media.getSize());
    this.setType(media.getType());
    this.setData(media.getData() != null ? new String(media.getData()) : null);
    this.setCreatedAt(media.getCreatedAt());
    this.setUpdatedAt(media.getUpdatedAt());
  }

  @Override
  public Media mapDtoToEntity() {
    Media media = new Media();
    media.setId(this.getId());
    media.setFilename(this.getFilename());
    media.setSize(this.getSize());
    media.setType(this.getType());
    media.setData(this.getData() != null ? this.getData().getBytes() : null);
    media.setCreatedAt(this.getCreatedAt());
    media.setUpdatedAt(this.getUpdatedAt());
    return media;
  }
}
