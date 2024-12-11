package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.ConsultationDto;
import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.model.Consultation;
import br.com.agendesaude.api.domain.model.Location;
import br.com.agendesaude.api.domain.repository.AppointmentRepository;
import br.com.agendesaude.api.domain.repository.ConsultationRepository;
import br.com.agendesaude.api.domain.repository.LocationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final LocationRepository locationRepository;
    private final AppointmentRepository appointmentRepository;

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
    public void updateConsultation(Long id, ConsultationDto consultationDto) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Consultation not found"));

        boolean hasScheduledAppointments = appointmentRepository.existsByConsultationIdAndStatus(id, AppointmentStatusType.SCHEDULED);
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

        boolean hasScheduledAppointments = appointmentRepository.existsByConsultationIdAndStatus(id, AppointmentStatusType.SCHEDULED);
        if (hasScheduledAppointments) {
            throw new IllegalStateException("Cannot delete consultation with scheduled appointments");
        }

        consultationRepository.delete(consultation);
    }
}
