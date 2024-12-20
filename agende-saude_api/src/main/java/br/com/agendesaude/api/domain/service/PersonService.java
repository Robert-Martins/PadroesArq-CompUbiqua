package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.AllergyDto;
import br.com.agendesaude.api.domain.dto.MedicalHistoryDto;
import br.com.agendesaude.api.domain.dto.PersonDto;
import br.com.agendesaude.api.domain.enums.AccessLevelType;
import br.com.agendesaude.api.domain.enums.UserType;
import br.com.agendesaude.api.domain.model.Allergy;
import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.domain.model.MedicalHistory;
import br.com.agendesaude.api.domain.model.Person;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.AddressRepository;
import br.com.agendesaude.api.domain.repository.AllergyRepository;
import br.com.agendesaude.api.domain.repository.MediaRepository;
import br.com.agendesaude.api.domain.repository.MedicalHistoryRepository;
import br.com.agendesaude.api.domain.repository.PersonRepository;
import br.com.agendesaude.api.domain.repository.UserRepository;
import br.com.agendesaude.api.infra.exception.BadRequestException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PersonService {

  @Autowired
  private AddressRepository addressRepository;

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

  @Autowired
  private UserService userService;

  @Transactional
  public PersonDto findById(Long id) {
    Person person = personRepository.findById(id)
        .orElseThrow(() -> new BadRequestException("Person not found."));
    return person.mapEntityToDto();
  }

  @Transactional
  public PersonDto findByUserId(Long userId) {
    Person person = personRepository.findByUserId(userId);
    if (person.getId() == null) {
      throw new BadRequestException("Person not found.");
    }
    return person.mapEntityToDto();
  }

  @Transactional
  public PersonDto create(PersonDto personDto) {
    userService.verifyTaxIdAndEmailExists(personDto.getUser());

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

    if (person.getUser().getId() != null
        && person.getUser().getAddress() != null && person.getUser().getAddress().getId() != null
        && person.getUser().getEmail() != null && !person.getUser().getEmail().isEmpty()
        && person.getUser().getTaxId() != null && !person.getUser().getTaxId().isEmpty()
        && person.getUser().getPhone() != null && !person.getUser().getPhone().isEmpty()

        && person.getProfilePicture() != null && person.getProfilePicture().getId() != null

        && person.getFullName() != null && !person.getFullName().isEmpty()
        && person.getBirthDate() != null
    ) {

      person.getUser().setAccessLevel(AccessLevelType.FULL);
    }

    Person savedPerson = personRepository.save(person);

    return savedPerson.mapEntityToDto();
  }

  @Transactional
  public PersonDto update(PersonDto personDto) {
    Long id = personDto.getId();
    Person existingPerson = personRepository.findById(id)
        .orElseThrow(() -> new BadRequestException("Person not found."));

    existingPerson.setFullName(
        personDto.getFullName() != null ? personDto.getFullName() : existingPerson.getFullName());
    existingPerson.setBirthDate(
        personDto.getBirthDate() != null ? personDto.getBirthDate() : existingPerson.getBirthDate());
    existingPerson.setGenderType(
        personDto.getGenderType() != null ? personDto.getGenderType() : existingPerson.getGenderType());
    existingPerson.setBloodType(
        personDto.getBloodType() != null ? personDto.getBloodType() : existingPerson.getBloodType());

    if (personDto.getUser().getAddress() != null) {
      existingPerson.getUser().setAddress(personDto.getUser().getAddress());
    }

    if (personDto.getUser().getPhone() != null) {
      existingPerson.getUser().setPhone(personDto.getUser().getPhone());
    }

    if (personDto.getUser().getPassword() != null) {
      existingPerson.getUser().setPassword(new BCryptPasswordEncoder().encode(personDto.getUser().getPassword()));
    }

    if (personDto.getUser().getEmail() != null) {
      existingPerson.getUser().setEmail(personDto.getUser().getEmail());
    }

    if (personDto.getUser().getTaxId() != null) {
      existingPerson.getUser().setTaxId(personDto.getUser().getTaxId());
    }

    if (personDto.getProfilePicture() != null) {
      Media profilePicture = mediaRepository.save(personDto.getProfilePicture());
      existingPerson.setProfilePicture(profilePicture);
    }

    if (personDto.getAllergies() != null) {
      List<Allergy> allergies = personDto.getAllergies().stream()
          .map(AllergyDto::mapDtoToEntity)
          .collect(Collectors.toList());
      existingPerson.setAllergy(allergies);
    }

    if (personDto.getMedicalHistories() != null) {
      List<MedicalHistory> medicalHistories = personDto.getMedicalHistories().stream()
          .map(MedicalHistoryDto::mapDtoToEntity)
          .collect(Collectors.toList());
      existingPerson.setMedicalHistory(medicalHistories);
    }

    if (existingPerson.getUser().getId() != null
        && existingPerson.getUser().getAddress() != null && existingPerson.getUser().getAddress().getId() != null
        && existingPerson.getUser().getEmail() != null && !existingPerson.getUser().getEmail().isEmpty()
        && existingPerson.getUser().getTaxId() != null && !existingPerson.getUser().getTaxId().isEmpty()
        && existingPerson.getUser().getPhone() != null && !existingPerson.getUser().getPhone().isEmpty()

        && existingPerson.getProfilePicture() != null && existingPerson.getProfilePicture().getId() != null

        && existingPerson.getFullName() != null && !existingPerson.getFullName().isEmpty()
        && existingPerson.getBirthDate() != null
    ) {

      existingPerson.getUser().setAccessLevel(AccessLevelType.FULL);
    }

    existingPerson = personRepository.save(existingPerson);

    return existingPerson.mapEntityToDto();
  }

  @Transactional
  public void delete(Long id) {
    if (!personRepository.existsById(id)) {
      throw new BadRequestException("Pessoa não encontrada.");
    }
    personRepository.deleteById(id);
  }
}
