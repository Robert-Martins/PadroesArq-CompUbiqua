package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.PersonDto;
import br.com.agendesaude.api.domain.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping
    public ResponseEntity<PersonDto> create(@Valid @RequestBody PersonDto personDto) {
        PersonDto createdPerson = personService.create(personDto);
        return ResponseEntity.ok(createdPerson);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonDto> findById(@PathVariable Long id) {
        PersonDto personDto = personService.findById(id);
        return ResponseEntity.ok(personDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonDto> update(@PathVariable Long id, @Valid @RequestBody PersonDto personDto) {
        PersonDto updatedPerson = personService.update(id, personDto);
        return ResponseEntity.ok(updatedPerson);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        personService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
