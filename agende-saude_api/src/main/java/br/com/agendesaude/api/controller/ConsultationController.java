package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.ConsultationDto;
import br.com.agendesaude.api.domain.dto.LocationDto;
import br.com.agendesaude.api.domain.service.ConsultationService;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
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
    public ResponseEntity<ConsultationDto> findConsultationById(@PathVariable Long id) {
        ConsultationDto consultationDto = consultationService.getConsultationById(id);
        return ResponseEntity.ok(consultationDto);
    }

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
