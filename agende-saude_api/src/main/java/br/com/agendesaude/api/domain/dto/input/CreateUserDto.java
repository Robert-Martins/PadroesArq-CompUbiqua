package br.com.agendesaude.api.domain.dto.input;

import jakarta.validation.constraints.*;

public record CreateUserDto(
        @NotBlank(message = "Nome é obrigatório")
        String name,

        @NotBlank(message = "Login é obrigatório")
        String login,

        @NotBlank(message = "Senha é obrigatória")
        String password
) {
}
