package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.model.Person;
import br.com.agendesaude.api.domain.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public Person create(Person person) {
        return personRepository.save(person);
    }
}
