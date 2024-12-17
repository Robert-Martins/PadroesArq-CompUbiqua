package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.MediaDto;
import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.domain.repository.MediaRepository;
import br.com.agendesaude.api.infra.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MediaService {

  private final MediaRepository mediaRepository;

//    @Transactional
//    public Long uploadMedia(MultipartFile file) {
//        try {
//            Media media = new Media();
//            media.setFilename(file.getOriginalFilename());
//            media.setSize(file.getSize());
//            media.setType(file.getContentType());
//            media.setData(file.getBytes());
//            mediaRepository.save(media);
//            return media.getId();
//        } catch (IOException e) {
//            throw new RuntimeException("Error saving media file", e);
//        }
//    }

  @Transactional
  public MediaDto createMedia(MediaDto mediaDto) {
    try {
      Media media = mediaDto.mapDtoToEntity();
      mediaRepository.save(media);
      return media.mapEntityToDto();
    } catch (Exception e) {
      throw new RuntimeException("Error saving media file", e);
    }
  }


  @Transactional
  public void deleteMedia(Long id) {
    Media media = mediaRepository.findById(id).orElseThrow(() ->
        new ResourceNotFoundException("Media not found with id: " + id));
    // Verificar se a mídia está em uso antes de deletar
    boolean isInUse = false; // Implementar lógica para verificar se a mídia está em uso
    if (isInUse) {
      throw new IllegalStateException("Cannot delete media that is in use");
    }
    mediaRepository.delete(media);
  }
}