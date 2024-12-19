package br.com.agendesaude.api.domain.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScreeningQuestionnaireAnswerDto {

  private String question;
  private boolean answer;
  private List<ScreeningQuestionnaireAnswerDto> subQuestionsAnswer;

  public ScreeningQuestionnaireAnswerDto() {
  }

  public ScreeningQuestionnaireAnswerDto(String question, boolean answer,
      List<ScreeningQuestionnaireAnswerDto> subQuestionsAnswer) {
    this.question = question;
    this.answer = answer;
    this.subQuestionsAnswer = subQuestionsAnswer;
  }

  public static List<ScreeningQuestionnaireAnswerDto> fromMap(Map<String, Boolean> questionnaire) {
    List<ScreeningQuestionnaireAnswerDto> dtoList = new ArrayList<>();
    if (questionnaire != null && !questionnaire.isEmpty()) {
      questionnaire.forEach((question, answer) -> {
        if (question != null && answer != null) {
          dtoList.add(new ScreeningQuestionnaireAnswerDto(question, answer, new ArrayList<>()));
        } else {
        }
      });
    }
    return dtoList;
  }

  public static Map<String, Boolean> toMap(List<ScreeningQuestionnaireAnswerDto> questionnaireDtos) {
    Map<String, Boolean> map = new HashMap<>();
    for (ScreeningQuestionnaireAnswerDto dto : questionnaireDtos) {
      map.put(dto.getQuestion(), dto.isAnswer());
      if (dto.getSubQuestionsAnswer() != null) {
        map.putAll(toMap(dto.getSubQuestionsAnswer()));
      }
    }
    return map;
  }
}
