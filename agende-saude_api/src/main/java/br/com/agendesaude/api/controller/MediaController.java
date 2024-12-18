package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.MediaDto;
import br.com.agendesaude.api.domain.service.MediaService;
import br.com.agendesaude.api.infra.exception.ErrorHandler;
import br.com.agendesaude.api.infra.exception.ErrorHandler.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class MediaController {

  @Autowired
  private MediaService mediaService;

//    @PostMapping
//    public ResponseEntity<Long> uploadMedia(@RequestParam("file") MultipartFile file) {
//        Long mediaId = mediaService.uploadMedia(file);
//        return ResponseEntity.ok(mediaId);
//    }

  @PostMapping
  public ResponseEntity<MediaDto> createMedia(@RequestParam("file") MultipartFile file) {
    try {
      MediaDto mediaDto = mediaService.createMedia(file);
      return ResponseEntity.ok(mediaDto);
    } catch (Exception e) {
      throw new CustomException("Error uploading media file");
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMedia(@PathVariable Long id) {
    mediaService.deleteMedia(id);
    return ResponseEntity.ok().build();
  }
}