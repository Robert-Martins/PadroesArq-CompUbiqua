package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.AllergyDto;
import br.com.agendesaude.api.domain.dto.MedicalHistoryDto;
import br.com.agendesaude.api.domain.dto.PersonDto;
import br.com.agendesaude.api.domain.enums.BloodType;
import br.com.agendesaude.api.domain.enums.GenderType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "agende_person")
@Getter
@Setter
public class Person extends BaseEntity {

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Allergy> allergy;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private List<MedicalHistory> medicalHistory;

  @ManyToOne
  @JoinColumn(name = "profile_picture_id")
  private Media profilePicture;

  @Column(nullable = false, length = 255)
  private String fullName;

  @Column
  private LocalDate birthDate;

  @Enumerated(EnumType.STRING)
  private GenderType genderType;

  @Enumerated(EnumType.STRING)
  private BloodType bloodType;

  @Override
  public PersonDto mapEntityToDto() {
    PersonDto personDto = new PersonDto();
    personDto.setId(this.getId());
    personDto.setFullName(this.getFullName());
    personDto.setBirthDate(this.getBirthDate());
    personDto.setGenderType(this.getGenderType());
    personDto.setBloodType(this.getBloodType());

    if (this.getAllergy() != null) {
      List<AllergyDto> allergyDtos = this.getAllergy().stream()
          .map(allergy -> new AllergyDto(allergy))
          .toList();
      personDto.setAllergies(allergyDtos);
    }

    if (this.getMedicalHistory() != null) {
      List<MedicalHistoryDto> medicalHistoryDtos = this.getMedicalHistory().stream()
          .map(history -> new MedicalHistoryDto(history))
          .toList();
      personDto.setMedicalHistories(medicalHistoryDtos);
    }

    if (this.getProfilePicture() != null) {
      personDto.setProfilePicture(this.getProfilePicture());
    }

    if (this.getUser() != null) {
      personDto.setUser(this.getUser());
    }

    return personDto;
  }

}
