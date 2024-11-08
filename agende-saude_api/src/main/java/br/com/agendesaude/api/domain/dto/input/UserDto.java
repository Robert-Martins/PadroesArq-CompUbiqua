package br.com.agendesaude.api.domain.dto.input;

import br.com.agendesaude.api.domain.model.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserDto(
        Long id,

        @NotBlank(message = "Nome é obrigatório")
        String name,

        @NotBlank(message = "Login é obrigatório")
        String login,

        @NotBlank(message = "Senha é obrigatória", groups = Create.class)
        String password
) {
    public UserDto(User usuario) {
        this(usuario.getId(), usuario.getName(), usuario.getLogin(), null);
    }

    public interface Create {}
    public interface Update {}
}
