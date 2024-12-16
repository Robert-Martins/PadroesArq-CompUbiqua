package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.enums.BloodType;
import br.com.agendesaude.api.domain.enums.GenderType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
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

  @OneToMany
  @JoinColumn(name = "allergy_id", nullable = false)
  private List<Allergy> allergy;

  @OneToMany
  @JoinColumn(name = "medicalHistory_id", nullable = false)
  private List<MedicalHistory> medicalHistory;

  @ManyToOne
  @JoinColumn(name = "profile_picture_id")
  private Media profilePicture;

  @Column(nullable = false, length = 255)
  private String fullName;

  @Column(length = 15)
  private String phone;

  @Column
  private LocalDate birthDate;

  @Enumerated(EnumType.STRING)
  private GenderType genderType;

  @Enumerated(EnumType.STRING)
  private BloodType bloodType;

  @Override
  public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
    return null;
  }
}
