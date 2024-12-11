package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.AppointmentDto;
import br.com.agendesaude.api.domain.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
public class AppointmentController {

    @Autowired
    private  AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Long> createAppointment(@Valid @RequestBody AppointmentDto appointmentDto) {
        Long id = appointmentService.createAppointment(appointmentDto);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateAppointmentStatus(@PathVariable Long id, @Valid @RequestBody AppointmentDto appointmentDto) {
        appointmentService.updateAppointmentStatus(id, appointmentDto);
        return ResponseEntity.ok().build();
    }
}
