package br.com.agendesaude.api.domain.dto.input;

import jakarta.validation.constraints.NotNull;

public record UpdateUserDto (
        @NotNull
        Long id,
        String name,
        String login,
        String password
) {
}
