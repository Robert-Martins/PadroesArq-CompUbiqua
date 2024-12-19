package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.EnumDto;
import br.com.agendesaude.api.domain.enums.AppointmentStatusType;
import br.com.agendesaude.api.domain.enums.BloodType;
import br.com.agendesaude.api.domain.enums.ConsultationType;
import br.com.agendesaude.api.domain.enums.GenderType;
import br.com.agendesaude.api.domain.enums.ScreeningStatus;
import br.com.agendesaude.api.domain.enums.SeverityType;
import br.com.agendesaude.api.domain.enums.UserType;
import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class EnumService {

  public List<EnumDto> findEnumByName(String name) {
    return switch (name.toUpperCase()) {
      case "USERTYPE" -> buildEnumDto(UserType.values());
      case "SEVERITYTYPE" -> buildEnumDto(SeverityType.values());
      case "SCREENINGSTATUS" -> buildEnumDto(ScreeningStatus.values());
      case "GENDERTYPE" -> buildEnumDto(GenderType.values());
      case "CONSULTATIONTYPE" -> buildEnumDto(ConsultationType.values());
      case "BLOODTYPE" -> buildEnumDto(BloodType.values());
      case "APPOINTMENTSTATUSTYPE" -> buildEnumDto(AppointmentStatusType.values());
      default -> List.of();
    };
  }

  private <E extends Enum<E>> List<EnumDto> buildEnumDto(E[] enumValues) {
    return Arrays.stream(enumValues)
        .map(e -> new EnumDto(e.name(), e.name().toLowerCase()))
        .toList();
  }
}