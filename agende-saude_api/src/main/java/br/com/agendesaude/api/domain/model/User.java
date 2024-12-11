package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.UserDto;
import br.com.agendesaude.api.domain.enums.AccessLevelType;
import br.com.agendesaude.api.domain.enums.UserType;
import br.com.agendesaude.api.infra.base.BaseEntity;
import br.com.agendesaude.api.infra.base.BaseEntityDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "agende_user")
@Getter
@Setter
public class User extends BaseEntity{

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccessLevelType accessLevel = AccessLevelType.BASIC;

    @Column(nullable = false)
    private boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "profile_picture_id")
    private Media profilePicture;

    @Override
    public BaseEntityDto<? extends BaseEntity> mapEntityToDto() {
        UserDto dto = new UserDto();
        dto.setId(this.getId());
        dto.setEmail(this.getEmail());
        dto.setUserType(this.getType());
        dto.setAccessLevelType(this.getAccessLevel());
        dto.setIsActive(this.isActive());
        dto.setCreatedAt(this.getCreatedAt());
        dto.setUpdatedAt(this.getUpdatedAt());
        return dto;
    }
}
