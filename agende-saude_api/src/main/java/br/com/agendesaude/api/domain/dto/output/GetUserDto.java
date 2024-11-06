package br.com.agendesaude.api.domain.dto.output;

import br.com.agendesaude.api.domain.model.User;

public record GetUserDto(Long id, String name, String login) {

    public GetUserDto(User user) {
        this(user.getId(), user.getName(), user.getLogin());
    }
}
