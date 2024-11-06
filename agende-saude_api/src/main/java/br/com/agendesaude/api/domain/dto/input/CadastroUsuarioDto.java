package br.com.agendesaude.api.domain.dto.input;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record CadastroUsuarioDto(
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Formato de Email inválido")
        String email,

        @NotBlank(message = "Senha é obrigatória")
        String senha,

        @NotBlank(message = "Telefone é obrigatório")
        String telefone,

        @NotBlank(message = "CPF é obrigatório")
        @Pattern(regexp = "\\d{11}", message = "Formato de CPF inválido")
        String cpf,

        @NotNull(message = "Data de Nascimento de obrigatória")
        LocalDate dataNascimento
) {
}
