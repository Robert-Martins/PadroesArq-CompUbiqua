package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.BloodType;
import br.com.agendesaude.api.domain.enums.GenderType;
import br.com.agendesaude.api.domain.model.Person;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PersonDto extends BaseEntityDto<Person> {

    private User user;
    private String fullName;
    private String phone;
    private String cpf;
    private LocalDate birthDate;
    private GenderType genderType;
    private BloodType bloodType;
    private String medicalHistory;

    @Override
    public Person mapDtoToEntity() {
        Person person = new Person();
        person.setId(this.getId());
        person.setUser(this.getUser());
        person.setFullName(this.getFullName());
        person.setPhone(this.getPhone());
        person.setCpf(this.getCpf());
        person.setBirthDate(this.getBirthDate());
        person.setGenderType(this.getGenderType());
        person.setBloodType(this.getBloodType());
        person.setMedicalHistory(this.getMedicalHistory());
        person.setCreatedAt(this.getCreatedAt());
        person.setUpdatedAt(this.getUpdatedAt());
        return person;
    }
}
