package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.ConsultationDto;
import br.com.agendesaude.api.domain.service.ConsultationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/consultation")
@RequiredArgsConstructor
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    @PostMapping
    public ResponseEntity<Long> createConsultation(@Valid @RequestBody ConsultationDto consultationDto) {
        Long id = consultationService.createConsultation(consultationDto);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsultationDto> getConsultation(@PathVariable Long id) {
        ConsultationDto consultationDto = consultationService.getConsultationById(id);
        return ResponseEntity.ok(consultationDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateConsultation(@PathVariable Long id, @Valid @RequestBody ConsultationDto consultationDto) {
        consultationService.updateConsultation(id, consultationDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable Long id) {
        consultationService.deleteConsultation(id);
        return ResponseEntity.ok().build();
    }
}
