package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.PersonDto;
import br.com.agendesaude.api.domain.service.PersonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/person")
public class PersonController {

  @Autowired
  private PersonService personService;

  @GetMapping("/{id}")
  public ResponseEntity<PersonDto> findById(@PathVariable Long id) {
    PersonDto personDto = personService.findById(id);
    return ResponseEntity.ok(personDto);
  }

  @PostMapping
  public ResponseEntity<PersonDto> create(@Valid @RequestBody PersonDto personDto) {
    PersonDto createdPerson = personService.create(personDto);
    return ResponseEntity.ok(createdPerson);
  }

  @PutMapping
  public ResponseEntity<PersonDto> updatePerson(@Valid @RequestBody PersonDto personDto) {
    PersonDto updatedPerson = personService.update(personDto);
    return ResponseEntity.ok(updatedPerson);
  }

  @DeleteMapping
  public ResponseEntity<Void> delete(@Valid @RequestBody PersonDto personDto) {
    personService.delete(personDto.getId());
    return ResponseEntity.noContent().build();
  }
}
