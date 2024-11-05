package br.com.agendesaude.api.domain.dto.input;

import jakarta.validation.constraints.NotNull;

public record AtualizacaoUsuarioDto(
        @NotNull
        Long id,
        String nome,
        String email,
        String senha,
        String telefone
) {
}
