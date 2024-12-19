package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.MediaDto;
import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.domain.repository.MediaRepository;
import br.com.agendesaude.api.infra.exception.BadRequestException;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MediaService {

  private final MediaRepository mediaRepository;

  @Transactional
  public MediaDto createMedia(MultipartFile file) {
    try {
      String contentType = file.getContentType();
      if (contentType == null || !isValidImageType(contentType)) {
        throw new BadRequestException("Invalid media type. Only PNG, JPG, and JPEG are allowed.");
      }

      Media media = new Media();
      media.setFilename(file.getOriginalFilename());
      media.setSize(file.getSize());
      media.setType(contentType);
      media.setData(file.getBytes());
      mediaRepository.save(media);

      return media.mapEntityToDto();
    } catch (IOException e) {
      throw new BadRequestException("Error saving media file", e);
    }
  }

  @Transactional
  public void deleteMedia(Long id) {
    Media media = mediaRepository.findById(id).orElseThrow(() ->
        new BadRequestException("Media not found with id: " + id));
    boolean isInUse = false;
    if (isInUse) {
      throw new BadRequestException("Cannot delete media that is in use");
    }
    mediaRepository.delete(media);
  }

  private boolean isValidImageType(String contentType) {
    return contentType.equals("image/png") || contentType.equals("image/jpg") || contentType.equals("image/jpeg");
  }


}