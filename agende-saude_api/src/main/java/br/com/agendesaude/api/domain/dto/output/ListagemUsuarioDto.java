package br.com.agendesaude.api.domain.dto.output;

import br.com.agendesaude.api.domain.model.Usuario;

import java.time.LocalDate;

public record ListagemUsuarioDto(Long id, String nome, String email, String telefone, String cpf, LocalDate dataNascimento) {
    public ListagemUsuarioDto(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getTelefone(),
                usuario.getCpf(),
                usuario.getDataNascimento()
        );
    }
}
