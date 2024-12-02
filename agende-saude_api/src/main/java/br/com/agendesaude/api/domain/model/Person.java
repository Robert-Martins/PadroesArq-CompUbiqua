package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.enums.BloodType;
import br.com.agendesaude.api.domain.enums.GenderType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "agende_person")
@Getter
@Setter
public class Person extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 255)
    private String fullName;

    @Column(length = 15)
    private String phone;

    @Column(nullable = false, unique = true, length = 11)
    private String cpf;

    @Column
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private GenderType genderType;

    @Enumerated(EnumType.STRING)
    private BloodType bloodType;

    @Column(columnDefinition = "TEXT")
    private String medicalHistory;

    @Override
    public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
        return null;
    }
}
