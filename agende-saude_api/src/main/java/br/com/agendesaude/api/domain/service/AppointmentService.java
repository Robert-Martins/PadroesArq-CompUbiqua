package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.AppointmentDto;
import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.model.Appointment;
import br.com.agendesaude.api.domain.model.Consultation;
import br.com.agendesaude.api.domain.model.Location;
import br.com.agendesaude.api.domain.model.Person;
import br.com.agendesaude.api.domain.model.Screening;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.AppointmentRepository;
import br.com.agendesaude.api.domain.repository.ConsultationRepository;
import br.com.agendesaude.api.domain.repository.LocationRepository;
import br.com.agendesaude.api.domain.repository.PersonRepository;
import br.com.agendesaude.api.domain.repository.ScreeningRepository;
import br.com.agendesaude.api.infra.exception.ErrorHandler.CustomException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AppointmentService {

  @Autowired
  private AppointmentRepository appointmentRepository;

  @Autowired
  private ConsultationRepository consultationRepository;

  @Autowired
  private LocationRepository locationRepository;

  @Autowired
  private PersonRepository personRepository;

  @Autowired
  private ScreeningRepository screeningRepository;

  public AppointmentDto createAppointment(AppointmentDto appointmentDto, User user) {

    Person person = personRepository.findByUserId(user.getId());

    Consultation consultation = appointmentDto.getConsultation().mapDtoToEntity();
    Location location = locationRepository.findById(consultation.getLocation().getId())
        .orElseThrow(() -> new CustomException("Location not found"));

    if (consultation.getId() == null) {
      consultation = new Consultation();
      consultation.setLocation(location);
      consultationRepository.save(consultation);
    } else {
      consultation = consultationRepository.findById(consultation.getId())
          .orElseThrow(() -> new CustomException("Consultation not found"));
    }

    Screening screening = appointmentDto.getScreening().mapDtoToEntity();
    if (screening.getId() == null) {
      screening = new Screening();
      screeningRepository.save(screening);
    } else {
      screening = screeningRepository.findById(screening.getId())
          .orElseThrow(() -> new CustomException("Screening not found"));
    }

    boolean hasScheduledAppointments = appointmentRepository.existsByConsultationIdAndStatus(
        consultation.getId(), AppointmentStatusType.SCHEDULED);
    if (hasScheduledAppointments) {
      throw new CustomException(
          "Cannot schedule appointment for consultation with an existing SCHEDULED appointment");
    }

    Appointment appointment = appointmentDto.mapDtoToEntity();
    appointment.setConsultation(consultation);
    appointment.setScreening(screening);

    appointmentRepository.save(appointment);
    return appointment.mapEntityToDto();
  }


  @Transactional
  public AppointmentDto updateAppointment(AppointmentDto appointmentDto) {

    Long appointmentDtoId = appointmentDto.getId();

    Consultation consultation = appointmentDto.getConsultation().mapDtoToEntity();
    if (consultation.getId() == null) {
      consultation = new Consultation();
      consultationRepository.save(consultation);
    } else {
      consultation = consultationRepository.findById(consultation.getId())
          .orElseThrow(() -> new CustomException("Consultation not found"));
    }

    Screening screening = appointmentDto.getScreening().mapDtoToEntity();
    if (screening.getId() == null) {
      screening = new Screening();
      screeningRepository.save(screening);
    } else {
      screening = screeningRepository.findById(screening.getId())
          .orElseThrow(() -> new CustomException("Screening not found"));
    }

    Appointment appointment = appointmentRepository.findById(appointmentDtoId)
        .orElseThrow(() -> new CustomException("Appointment not found"));

    boolean hasScheduledAppointments = appointmentRepository.existsByConsultationIdAndStatus(
        consultation.getId(), AppointmentStatusType.SCHEDULED);
    if (hasScheduledAppointments && appointmentDto.getStatus() == AppointmentStatusType.SCHEDULED) {
      throw new CustomException(
          "Cannot update appointment for consultation with an existing SCHEDULED appointment");
    }

    appointment.setConsultation(consultation);
    appointment.setScreening(screening);
    appointment.setStatus(appointmentDto.getStatus());
    appointment.setNotes(appointmentDto.getNotes());

    appointmentRepository.save(appointment);
    return appointment.mapEntityToDto();
  }

  @Transactional
  public List<AppointmentDto> getNextAppointments(Long userId) {

    Person person = personRepository.findByUserId(userId);

    LocalDateTime now = Instant.now().atZone(ZoneId.systemDefault()).toLocalDateTime();

    Pageable pageable = PageRequest.of(0, 2);

    List<Appointment> appointments = appointmentRepository.findNextAppointments(now, person.getId(),
        AppointmentStatusType.SCHEDULED, pageable);

    return appointments.stream()
        .map(appointment -> appointment.mapEntityToDto())
        .collect(Collectors.toList());
  }

  @Transactional
  public List<AppointmentDto> getScheduledEmergencyAppointments(User user) {

    Person person = personRepository.findByUserId(user.getId());

    List<Appointment> appointments = appointmentRepository.findScheduledEmergencyAppointments(person.getId());

    return appointments.stream()
        .map(appointment -> appointment.mapEntityToDto())
        .collect(Collectors.toList());
  }

  public Page<AppointmentDto> findAllByPerson(AppointmentStatusType status, Pageable pageable) {
    return appointmentRepository.findByStatus(status, pageable)
        .map(Appointment::mapEntityToDto);
  }

}
