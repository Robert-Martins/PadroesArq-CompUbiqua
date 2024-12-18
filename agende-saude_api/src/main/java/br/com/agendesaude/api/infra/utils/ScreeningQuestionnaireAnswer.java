package br.com.agendesaude.api.infra.utils;

import java.util.List;

public class ScreeningQuestionnaireAnswer {

  private int id;
  private String question;
  private boolean answer;
  private List<ScreeningQuestionnaireAnswer> subQuestionsAnswer;

  public ScreeningQuestionnaireAnswer() {
  }

  public ScreeningQuestionnaireAnswer(int id, String question, boolean answer,
      List<ScreeningQuestionnaireAnswer> subQuestionsAnswer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.subQuestionsAnswer = subQuestionsAnswer;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public boolean isAnswer() {
    return answer;
  }

  public void setAnswer(boolean answer) {
    this.answer = answer;
  }

  public List<ScreeningQuestionnaireAnswer> getSubQuestionsAnswer() {
    return subQuestionsAnswer;
  }

  public void setSubQuestionsAnswer(List<ScreeningQuestionnaireAnswer> subQuestionsAnswer) {
    this.subQuestionsAnswer = subQuestionsAnswer;
  }
}
