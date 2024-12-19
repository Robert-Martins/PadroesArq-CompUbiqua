//package br.com.agendesaude.api.controller;
//
//import br.com.agendesaude.api.domain.model.Screening;
//import br.com.agendesaude.api.domain.service.ScreeningService;
//import br.com.agendesaude.api.infra.utils.ScreeningQuestionnaireAnswer;
//import java.util.List;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/screenings")
//public class ScreeningController {
//
//    private final ScreeningService screeningService;
//
//    public ScreeningController(ScreeningService screeningService) {
//        this.screeningService = screeningService;
//    }
//
//    @PostMapping("/answers")
//    public ResponseEntity<Screening> sendScreeningAnswers(@RequestBody Screening screening) {
//        Screening savedScreening = screeningService.saveScreening(screening);
//        return ResponseEntity.ok(savedScreening);
//    }
//
//    @GetMapping("/questions")
//    public ResponseEntity<List<ScreeningQuestionnaireAnswer>> getScreeningQuestions() {
//        List<ScreeningQuestionnaireAnswer> questions = screeningService.getScreeningQuestions();
//        return ResponseEntity.ok(questions);
//    }
//
//    @GetMapping("/{screeningId}/answered")
//    public ResponseEntity<List<ScreeningQuestionnaireAnswer>> getAnsweredScreening(@PathVariable Long screeningId) {
//        List<ScreeningQuestionnaireAnswer> answers = screeningService.getAnsweredScreening(screeningId);
//        return ResponseEntity.ok(answers);
//    }
//}