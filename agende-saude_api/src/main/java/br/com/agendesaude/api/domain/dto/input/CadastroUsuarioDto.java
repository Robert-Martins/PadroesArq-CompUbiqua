package br.com.agendesaude.api.domain.dto.input;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record CadastroUsuarioDto(
        @NotBlank
        String nome,

        @NotBlank
        @Email
        String email,

        @NotBlank
        String senha,

        @NotBlank
        String telefone,

        @NotBlank
        @Pattern(regexp = "\\d{11}")
        String cpf,

        @NotNull
        LocalDate dataNascimento
) {
}
