package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.ConsultationDto;
import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.model.Consultation;
import br.com.agendesaude.api.domain.model.Location;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.AppointmentRepository;
import br.com.agendesaude.api.domain.repository.ConsultationRepository;
import br.com.agendesaude.api.domain.repository.LocationRepository;
import br.com.agendesaude.api.domain.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ConsultationService {

  @Autowired
  private AppointmentRepository appointmentRepository;

  @Autowired
  private ConsultationRepository consultationRepository;

  @Autowired
  private LocationRepository locationRepository;

  @Autowired
  private UserRepository userRepository;


  @Transactional
  public Long createConsultation(ConsultationDto consultationDto) {
    Location location = locationRepository.findById(consultationDto.getLocation().getId())
        .orElseThrow(() -> new EntityNotFoundException("Location not found"));

    Consultation consultation = consultationDto.mapDtoToEntity();
    consultation.setLocation(location);
    consultationRepository.save(consultation);
    return consultation.getId();
  }

  @Transactional(readOnly = true)
  public ConsultationDto getConsultationById(Long id) {
    Consultation consultation = consultationRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Consultation not found"));

    return new ConsultationDto(consultation);
  }

  @Transactional
  public boolean areConsultationsAvailableNearby(BigDecimal latitude, BigDecimal longitude, User user) {

    if (latitude == null || longitude == null) {
      if (user != null && user.getAddress() != null) {
        latitude = user.getAddress().getLatitude();
        longitude = user.getAddress().getLongitude();
      }
    }
    double radius = 7.0;

    List<Consultation> consultations = consultationRepository.findConsultationsNearLocation(latitude, longitude,
        radius);
    return !consultations.isEmpty();
  }

  @Transactional
  public boolean findConsultationsWithinNext7Days() {
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime sevenDaysFromNow = now.plusDays(7);

    List<Consultation> consultations = consultationRepository.findConsultationsWithinNext7Days(now, sevenDaysFromNow);

    return !consultations.isEmpty();
  }

  @Transactional
  public Page<ConsultationDto> findAllConsultations(Pageable pageable) {
    return consultationRepository.findAll(pageable)
            .map(Consultation::mapEntityToDto);
  }

  @Transactional
  public void updateConsultation(Long id, ConsultationDto consultationDto) {
    Consultation consultation = consultationRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Consultation not found"));

    boolean hasScheduledAppointments = appointmentRepository.existsByConsultationIdAndStatus(id,
        AppointmentStatusType.SCHEDULED);
    if (hasScheduledAppointments) {
      throw new IllegalStateException("Cannot update consultation with scheduled appointments");
    }

    consultation.setResponsibleDoctor(consultationDto.getResponsibleDoctor());
    consultation.setType(consultationDto.getType());
    consultation.setSpecialty(consultationDto.getSpecialty());
    consultation.setDate(consultationDto.getDate());
    consultationRepository.save(consultation);
  }

  @Transactional
  public void deleteConsultation(Long id) {
    Consultation consultation = consultationRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Consultation not found"));

    boolean hasScheduledAppointments = appointmentRepository.existsByConsultationIdAndStatus(id,
        AppointmentStatusType.SCHEDULED);
    if (hasScheduledAppointments) {
      throw new IllegalStateException("Cannot delete consultation with scheduled appointments");
    }

    consultationRepository.delete(consultation);
  }
}
