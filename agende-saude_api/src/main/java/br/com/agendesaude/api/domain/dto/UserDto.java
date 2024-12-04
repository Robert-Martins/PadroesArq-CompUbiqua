package br.com.agendesaude.api.domain.dto;

import br.com.agendesaude.api.domain.enums.AccessLevelType;
import br.com.agendesaude.api.domain.enums.UserType;
import br.com.agendesaude.api.domain.model.Media;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.infra.base.BaseEntityDto;

public class UserDto extends BaseEntityDto<User> {

    private String email;
    private UserType userType;
    private AccessLevelType accessLevelType;
    private Boolean isActive;
    private Media profilePicture;

    @Override
    public User mapDtoToEntity() {
        User user = new User();
        return null;
    }
}
