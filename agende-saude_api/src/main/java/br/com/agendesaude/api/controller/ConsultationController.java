package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.ConsultationDto;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.service.ConsultationService;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
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
  public ResponseEntity<Page<ConsultationDto>> findAllCommonConsultations(
      @RequestParam(required = false) String responsibleDoctor,
      @RequestParam(required = false) String specialty,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate,
      Pageable pageable) {

    Page<ConsultationDto> result = consultationService.findAllConsultations(
        responsibleDoctor, specialty, startDate, endDate, pageable);

    return ResponseEntity.ok(result);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ConsultationDto> findConsultationById(@PathVariable Long id) {
    ConsultationDto consultationDto = consultationService.getConsultationById(id);
    return ResponseEntity.ok(consultationDto);
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
  public ResponseEntity<Long> createConsultation(@Valid @RequestBody ConsultationDto consultationDto) {
    Long id = consultationService.createConsultation(consultationDto);
    return ResponseEntity.ok(id);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateConsultation(@PathVariable Long id,
      @Valid @RequestBody ConsultationDto consultationDto) {
    consultationService.updateConsultation(id, consultationDto);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteConsultation(@PathVariable Long id) {
    consultationService.deleteConsultation(id);
    return ResponseEntity.ok().build();
  }
}
