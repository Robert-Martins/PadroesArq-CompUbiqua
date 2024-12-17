package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.SeverityType;
import br.com.agendesaude.api.domain.model.Allergy;
import br.com.agendesaude.api.domain.model.Person;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllergyDto extends BaseEntityDto<Allergy> {

  @NotNull
  private Long personId;

  @NotNull
  private String description;

  private SeverityType severity;

  public AllergyDto() {
  }

  public AllergyDto(Allergy allergy) {
    this.setId(allergy.getId());
    this.setPersonId(allergy.getPerson().getId());
    this.setDescription(allergy.getDescription());
    this.setSeverity(allergy.getSeverity());
    this.setCreatedAt(allergy.getCreatedAt());
    this.setUpdatedAt(allergy.getUpdatedAt());
  }

  @Override
  public Allergy mapDtoToEntity() {
    Allergy allergy = new Allergy();
    allergy.setId(this.getId());
    Person person = new Person();
    person.setId(this.getPersonId());
    allergy.setPerson(person);
    allergy.setDescription(this.getDescription());
    allergy.setSeverity(this.getSeverity());
    allergy.setCreatedAt(this.getCreatedAt());
    allergy.setUpdatedAt(this.getUpdatedAt());
    return allergy;
  }
}
