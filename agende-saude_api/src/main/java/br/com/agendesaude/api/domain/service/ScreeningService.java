package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.model.Screening;
import br.com.agendesaude.api.domain.repository.ScreeningRepository;
import br.com.agendesaude.api.infra.exception.BadRequestException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ScreeningService {

  @Autowired
  ScreeningRepository screeningRepository;
  @Autowired
  private RestTemplate restTemplate;
  @Value("${nest.api.url}")
  private String nestApiUrl;

  @Value("${api.key}")
  private String apiKey;

  @Transactional
  public Object getScreeningQuestions() {
    HttpHeaders headers = new HttpHeaders();
    headers.set("x-api-key", apiKey);

    HttpEntity<String> entity = new HttpEntity<>(headers);

    ResponseEntity<Object> response = restTemplate.exchange(
        nestApiUrl + "/screening/questions",
        HttpMethod.GET,
        entity,
        Object.class
    );

    if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
      throw new BadRequestException("Falha ao obter perguntas do serviço externo");
    }

    return response.getBody();
  }

  @Transactional
  public Object getAnsweredScreening(Long screeningId) {
    Screening screening = screeningRepository.findById(screeningId)
        .orElseThrow(() -> new BadRequestException("Screening not found"));

    Object screeningQuestionnaire = screening.getQuestionnaire();

    return screeningQuestionnaire;
  }
}
