package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.ScreeningDto;
import br.com.agendesaude.api.domain.dto.ScreeningQuestionnaireAnswerDto;
import br.com.agendesaude.api.domain.model.Screening;
import br.com.agendesaude.api.domain.service.ScreeningService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/screening")
public class ScreeningController {

  @Autowired
  private ScreeningService screeningService;

  @GetMapping("/{screeningId}/answered")
  public ResponseEntity<List<ScreeningQuestionnaireAnswerDto>> getAnsweredScreening(@PathVariable Long screeningId) {
    List<ScreeningQuestionnaireAnswerDto> answers = screeningService.getAnsweredScreening(screeningId);
    return ResponseEntity.ok(answers);
  }

  @PostMapping("/answers")
  public ResponseEntity<Screening> sendScreeningAnswers(@RequestBody ScreeningDto screeningDto) {
    Screening savedScreening = screeningService.saveScreening(screeningDto);
    return ResponseEntity.ok(savedScreening);
  }

//  @GetMapping("/questions")
//  public ResponseEntity<List<ScreeningQuestionnaireAnswer>> getScreeningQuestions() {
//    List<ScreeningQuestionnaireAnswer> questions = screeningService.getScreeningQuestions();
//    return ResponseEntity.ok(questions);
//  }
}