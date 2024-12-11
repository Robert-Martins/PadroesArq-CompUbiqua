package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.AppointmentDto;
import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.model.Appointment;
import br.com.agendesaude.api.domain.model.Consultation;
import br.com.agendesaude.api.domain.repository.AppointmentRepository;
import br.com.agendesaude.api.domain.repository.ConsultationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    @Transactional
    public Long createAppointment(AppointmentDto appointmentDto) {
        Consultation consultation = consultationRepository.findById(appointmentDto.getConsultation().getId())
                .orElseThrow(() -> new EntityNotFoundException("Consultation not found"));

        boolean hasScheduledAppointments = appointmentRepository.existsByConsultationIdAndStatus(
                consultation.getId(), AppointmentStatusType.SCHEDULED);
        if (hasScheduledAppointments) {
            throw new IllegalStateException("Cannot schedule appointment for consultation with an existing SCHEDULED appointment");
        }

        Appointment appointment = appointmentDto.mapDtoToEntity();
        appointment.setConsultation(consultation);
        appointmentRepository.save(appointment);
        return appointment.getId();
    }

    @Transactional
    public void updateAppointmentStatus(Long id, AppointmentDto appointmentDto) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        if (appointmentDto.getStatus() == AppointmentStatusType.SCHEDULED) {
            boolean hasConflictingAppointment = appointmentRepository.existsByConsultationIdAndStatus(
                    appointment.getConsultation().getId(), AppointmentStatusType.SCHEDULED);
            if (hasConflictingAppointment) {
                throw new IllegalStateException("Cannot change status to SCHEDULED due to conflicting appointment");
            }
        }

        appointment.setStatus(appointmentDto.getStatus());
        appointmentRepository.save(appointment);
    }
}
