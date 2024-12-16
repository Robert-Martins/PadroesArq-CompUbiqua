package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.PersonDto;
import br.com.agendesaude.api.domain.model.Person;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.PersonRepository;
import br.com.agendesaude.api.domain.repository.UserRepository;
import br.com.agendesaude.api.infra.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PersonService {

  @Autowired
  private PersonRepository personRepository;

  @Autowired
  private UserRepository userRepository;

  @Transactional
  public PersonDto create(PersonDto personDto) {
//        if (personRepository.existsByCpf(personDto.getTaxId())) {
//            throw new ValidationException("CPF já cadastrado.");
//        }

    User user = personDto.getUser();
    userRepository.save(user);

    Person person = personDto.mapDtoToEntity();
    person.setUser(user);
    person = personRepository.save(person);

    return (PersonDto) person.mapEntityToDto();
  }

  public PersonDto findById(Long id) {
    Person person = personRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada."));
    return (PersonDto) person.mapEntityToDto();
  }

  @Transactional
  public PersonDto update(Long id, PersonDto personDto) {
    Person existingPerson = personRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada."));

    existingPerson.setFullName(personDto.getFullName());
    existingPerson.setPhone(personDto.getPhone());
    existingPerson.setBirthDate(personDto.getBirthDate());
    existingPerson.setGenderType(personDto.getGenderType());
    existingPerson.setBloodType(personDto.getBloodType());
//        existingPerson.setMedicalHistory(personDto.getMedicalHistory());

    existingPerson = personRepository.save(existingPerson);

    return (PersonDto) existingPerson.mapEntityToDto();
  }

  @Transactional
  public void delete(Long id) {
    if (!personRepository.existsById(id)) {
      throw new ResourceNotFoundException("Pessoa não encontrada.");
    }
    personRepository.deleteById(id);
  }
}
