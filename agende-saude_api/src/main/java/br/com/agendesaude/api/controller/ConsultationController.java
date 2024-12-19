package br.com.agendesaude.api.controller;

import static br.com.agendesaude.api.domain.service.UserService.verifyFullAcessUser;

import br.com.agendesaude.api.domain.dto.ConsultationDto;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.service.ConsultationService;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/consultation")
@RequiredArgsConstructor
public class ConsultationController {

  @Autowired
  private ConsultationService consultationService;

  @GetMapping
  public ResponseEntity<Page<ConsultationDto>> findAllCommonConsultations(Pageable pageable) {

    Page<ConsultationDto> result = consultationService.findAllConsultations(pageable);

    return ResponseEntity.ok(result);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ConsultationDto> findConsultationById(@PathVariable Long id) {
    ConsultationDto consultationDto = consultationService.getConsultationById(id);
    return ResponseEntity.ok(consultationDto);
  }

  @GetMapping("/location/{locationId}")
  public ResponseEntity<Page<ConsultationDto>> findAllCommonConsultationsByLocationId(
      @PathVariable Long locationId,
      Pageable pageable) {

    Page<ConsultationDto> result = consultationService.findAllCommonConsultationsByLocationId(locationId, pageable);

    return ResponseEntity.ok(result);
  }

  @GetMapping("/available")
  public boolean checkConsultationsAvailability(
      @RequestParam(required = false) BigDecimal latitude,
      @RequestParam(required = false) BigDecimal longitude,
      Authentication principal) {
    User user = ((User) principal.getPrincipal());
    return consultationService.areConsultationsAvailableNearby(latitude, longitude, user);
  }

  @PostMapping
  public ResponseEntity<Long> createConsultation(@Valid @RequestBody ConsultationDto consultationDto,
      Authentication principal) {
    User user = ((User) principal.getPrincipal());
    verifyFullAcessUser(user);
    Long id = consultationService.createConsultation(consultationDto);
    return ResponseEntity.ok(id);
  }

  @PutMapping
  public ResponseEntity<ConsultationDto> updateConsultation(@Valid @RequestBody ConsultationDto consultationDto,
      Authentication principal) {
    User user = ((User) principal.getPrincipal());
    verifyFullAcessUser(user);
    ConsultationDto consultation = consultationService.updateConsultation(consultationDto.getId(), consultationDto);
    return ResponseEntity.ok(consultation);
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteConsultation(@Valid @RequestBody ConsultationDto consultationDto,
      Authentication principal) {
    User user = ((User) principal.getPrincipal());
    verifyFullAcessUser(user);
    consultationService.deleteConsultation(consultationDto.getId());
    return ResponseEntity.ok().build();
  }
}
