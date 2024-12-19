package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.ScreeningDto;
import br.com.agendesaude.api.domain.dto.ScreeningQuestionnaireAnswerDto;
import br.com.agendesaude.api.domain.model.Screening;
import br.com.agendesaude.api.domain.repository.ScreeningRepository;
import br.com.agendesaude.api.infra.exception.BadRequestException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScreeningService {

  @Autowired
  ScreeningRepository screeningRepository;

  @Transactional
  public Screening saveScreening(ScreeningDto screeningDto) {

    Screening screening = screeningDto.mapDtoToEntity();

    return screeningRepository.save(screening);
  }

  @Transactional
  public List<ScreeningQuestionnaireAnswerDto> getAnsweredScreening(Long screeningId) {
    Screening screening = screeningRepository.findById(screeningId)
        .orElseThrow(() -> new BadRequestException("Screening not found"));

    Map<String, Boolean> questionnaire = screening.getQuestionnaire();

    List<ScreeningQuestionnaireAnswerDto> answeredQuestionnarie = ScreeningQuestionnaireAnswerDto.fromMap(
        questionnaire);

    return answeredQuestionnarie;
  }

//  @Transactional
//  public List<ScreeningQuestionnaireAnswer> getScreeningQuestions() {
//    return screeningRepository.findAll();
//  }

}
