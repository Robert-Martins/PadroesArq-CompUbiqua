package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.MediaDto;
import br.com.agendesaude.api.infra.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "agende_media")
@Getter
@Setter
public class Media extends BaseEntity {

  @Column(nullable = false)
  private String filename;

  @Column(nullable = false)
  private Long size;

  @Column(nullable = false)
  private String type;

  @Lob
  @Column(nullable = false)
  private byte[] data;

  @Override
  public MediaDto mapEntityToDto() {
    MediaDto mediaDto = new MediaDto();
    mediaDto.setId(this.getId());
    mediaDto.setFilename(this.getFilename());
    mediaDto.setSize(this.getSize());
    mediaDto.setType(this.getType());
    mediaDto.setData(this.getData() != null ? new String(this.getData()) : null);
    mediaDto.setCreatedAt(this.getCreatedAt());
    mediaDto.setUpdatedAt(this.getUpdatedAt());
    return mediaDto;
  }

}
