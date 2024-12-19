package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.BloodType;
import br.com.agendesaude.api.domain.enums.GenderType;
import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.domain.model.Person;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonDto extends BaseEntityDto<Person> {

  private User user;

  private String fullName;

  private String phone;

  private LocalDate birthDate;

  private GenderType genderType;

  private BloodType bloodType;

  private List<AllergyDto> allergies;
  private List<MedicalHistoryDto> medicalHistories;

  private Media profilePicture;

  public PersonDto() {
  }

  public PersonDto(Person person) {
    this.setId(person.getId());
    this.setUser(person.getUser());
    this.setFullName(person.getFullName());
    this.setBirthDate(person.getBirthDate());
    this.setGenderType(person.getGenderType());
    this.setBloodType(person.getBloodType());

    this.setAllergies(person.getAllergy() != null ?
        person.getAllergy().stream().map(AllergyDto::new).collect(Collectors.toList()) : null);

    this.setMedicalHistories(person.getMedicalHistory() != null ?
        person.getMedicalHistory().stream().map(MedicalHistoryDto::new).collect(Collectors.toList()) : null);

    this.setProfilePicture(person.getProfilePicture());
    this.setCreatedAt(person.getCreatedAt());
    this.setUpdatedAt(person.getUpdatedAt());
  }

  @Override
  public Person mapDtoToEntity() {
    Person person = new Person();
    person.setId(this.getId());
    person.setUser(this.getUser());
    person.setFullName(this.getFullName());
    person.setBirthDate(this.getBirthDate());
    person.setGenderType(this.getGenderType());
    person.setBloodType(this.getBloodType());

    if (this.getAllergies() != null) {
      person.setAllergy(this.getAllergies().stream().map(AllergyDto::mapDtoToEntity).collect(Collectors.toList()));
    }

    if (this.getMedicalHistories() != null) {
      person.setMedicalHistory(
          this.getMedicalHistories().stream().map(MedicalHistoryDto::mapDtoToEntity).collect(Collectors.toList()));
    }

    person.setProfilePicture(this.getProfilePicture());
    person.setCreatedAt(this.getCreatedAt());
    person.setUpdatedAt(this.getUpdatedAt());

    return person;
  }
}
