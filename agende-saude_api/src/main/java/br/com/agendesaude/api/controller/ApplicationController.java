package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.EnumDto;
import br.com.agendesaude.api.domain.service.EnumService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/application")
public class ApplicationController {

  private final EnumService enumService;

  public ApplicationController(EnumService enumService) {
    this.enumService = enumService;
  }

  @GetMapping("/enum-by-name/{name}")
  public ResponseEntity<List<EnumDto>> findEnumByName(@PathVariable String name) {
    List<EnumDto> enumValues = enumService.findEnumByName(name);
    if (enumValues.isEmpty()) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(enumValues);
  }
}