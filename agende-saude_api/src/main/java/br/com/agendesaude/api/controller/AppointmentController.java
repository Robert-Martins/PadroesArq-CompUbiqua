package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.AppointmentDto;
import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.service.AppointmentService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
public class AppointmentController {

  @Autowired
  private AppointmentService appointmentService;

  @GetMapping
  public ResponseEntity<Page<AppointmentDto>> findAllByPerson(
      @RequestParam int page,
      @RequestParam int size,
      @RequestParam String sort,
      @RequestParam String direction,
      @RequestParam(required = false) AppointmentStatusType status
  ) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sort));
    Page<AppointmentDto> result = appointmentService.findAllByPerson(status, pageable);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/next")
  public ResponseEntity<List<AppointmentDto>> getNextAppointments(Authentication principal) {
    User user = ((User) principal.getPrincipal());
    List<AppointmentDto> appointments = appointmentService.getNextAppointments(user.getId());
    return ResponseEntity.ok(appointments);
  }

  @PostMapping
  public ResponseEntity<AppointmentDto> createAppointment(@Valid @RequestBody AppointmentDto appointmentDto,
      Authentication principal) {
    User user = ((User) principal.getPrincipal());
    AppointmentDto appointment = appointmentService.createAppointment(appointmentDto, user);
    return ResponseEntity.ok(appointment);
  }

  @PutMapping("/{id}")
  public ResponseEntity<AppointmentDto> updateAppointment(@Valid @RequestBody AppointmentDto appointmentDto) {
    appointmentService.updateAppointment(appointmentDto);
    return ResponseEntity.ok().build();
  }


}
