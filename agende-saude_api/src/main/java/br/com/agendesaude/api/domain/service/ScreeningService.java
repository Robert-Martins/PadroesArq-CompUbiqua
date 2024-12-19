package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.repository.ScreeningRepository;
import br.com.agendesaude.api.infra.utils.ScreeningQuestionnaireAnswer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

public class ScreeningService {

  @Autowired
  ScreeningRepository screeningRepository;

//  @Transactional
//  public Screening saveScreening(Screening screening) {
//    return screeningRepository.save(screening);
//  }
//
//  @Transactional
//  public List<ScreeningQuestionnaireAnswer> getScreeningQuestions() {
//    return screeningRepository.findAll();
//  }
//
//  @Transactional
//  public List<ScreeningQuestionnaireAnswer> getAnsweredScreening(Long screeningId) {
//    Screening screening = screeningRepository.findById(screeningId)
//        .orElseThrow(() -> new EntityNotFoundException("Screening not found"));
//    return screening.getQuestionnaire();
//  }

  private Map<String, Boolean> convertToMap(List<ScreeningQuestionnaireAnswer> answers) {
    Map<String, Boolean> map = new HashMap<>();
    for (ScreeningQuestionnaireAnswer answer : answers) {
      map.put(answer.getQuestion(), answer.isAnswer());
      if (answer.getSubQuestionsAnswer() != null) {
        map.putAll(convertToMap(answer.getSubQuestionsAnswer()));
      }
    }
    return map;
  }
}
