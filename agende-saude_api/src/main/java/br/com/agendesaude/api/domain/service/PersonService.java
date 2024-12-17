package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.AllergyDto;
import br.com.agendesaude.api.domain.dto.MedicalHistoryDto;
import br.com.agendesaude.api.domain.dto.PersonDto;
import br.com.agendesaude.api.domain.enums.UserType;
import br.com.agendesaude.api.domain.model.Allergy;
import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.domain.model.MedicalHistory;
import br.com.agendesaude.api.domain.model.Person;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.AllergyRepository;
import br.com.agendesaude.api.domain.repository.MediaRepository;
import br.com.agendesaude.api.domain.repository.MedicalHistoryRepository;
import br.com.agendesaude.api.domain.repository.PersonRepository;
import br.com.agendesaude.api.domain.repository.UserRepository;
import br.com.agendesaude.api.infra.exception.ResourceNotFoundException;
import br.com.agendesaude.api.infra.exception.ValidationException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PersonService {

  @Autowired
  private AllergyRepository allergyRepository;

  @Autowired
  private MedicalHistoryRepository medicalHistoryRepository;

  @Autowired
  private MediaRepository mediaRepository;

  @Autowired
  private PersonRepository personRepository;

  @Autowired
  private UserRepository userRepository;

  @Transactional
  public PersonDto create(PersonDto personDto) {
    if (userRepository.existsByTaxId(personDto.getUser().getTaxId())) {
      throw new ValidationException("CPF já cadastrado.");
    }

    User user = personDto.getUser();
    user.setType(UserType.PERSON);
    user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
    User savedUser = userRepository.save(user);

    Media profilePicture = personDto.getProfilePicture();
    if (profilePicture != null) {
      profilePicture = mediaRepository.save(profilePicture);
    }

    Person person = personDto.mapDtoToEntity();
    person.setUser(savedUser);
    person.setProfilePicture(profilePicture);
    person = personRepository.save(person);

    if (personDto.getAllergies() != null) {
      List<Allergy> allergies = new ArrayList<>();
      for (AllergyDto allergyDto : personDto.getAllergies()) {
        Allergy allergy = allergyDto.mapDtoToEntity();
        allergy.setPerson(person);
        allergies.add(allergy);
      }
      person.setAllergy(allergies);
    }

    if (personDto.getMedicalHistories() != null) {
      List<MedicalHistory> medicalHistories = new ArrayList<>();
      for (MedicalHistoryDto historyDto : personDto.getMedicalHistories()) {
        MedicalHistory history = historyDto.mapDtoToEntity();
        history.setPerson(person);
        medicalHistories.add(history);
      }
      person.setMedicalHistory(medicalHistories);
    }

    person = personRepository.save(person);

    return person.mapEntityToDto();
  }


  public PersonDto findById(Long id) {
    Person person = personRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada."));
    return person.mapEntityToDto();
  }

  @Transactional
  public PersonDto update(Long id, PersonDto personDto) {
    Person existingPerson = personRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada."));

    existingPerson.setFullName(personDto.getFullName());
    existingPerson.setBirthDate(personDto.getBirthDate());
    existingPerson.setGenderType(personDto.getGenderType());
    existingPerson.setBloodType(personDto.getBloodType());
//    existingPerson.setMedicalHistory(personDto.getMedicalHistory());

    existingPerson = personRepository.save(existingPerson);

    return existingPerson.mapEntityToDto();
  }

  @Transactional
  public void delete(Long id) {
    if (!personRepository.existsById(id)) {
      throw new ResourceNotFoundException("Pessoa não encontrada.");
    }
    personRepository.deleteById(id);
  }
}
