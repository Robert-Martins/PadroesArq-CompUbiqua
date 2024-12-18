package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.infra.utils.ScreeningQuestionnaireAnswer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ScreeningService {


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
