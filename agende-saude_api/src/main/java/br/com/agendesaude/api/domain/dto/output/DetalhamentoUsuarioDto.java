package br.com.agendesaude.api.domain.dto.output;

import br.com.agendesaude.api.domain.model.Usuario;

import java.time.LocalDate;

public record DetalhamentoUsuarioDto(Long id, String nome, String email, String telefone, String cpf, LocalDate dataNascimento) {

    public DetalhamentoUsuarioDto(Usuario usuario) {
        this(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getTelefone(), usuario.getCpf(), usuario.getDataNascimento());
    }
}
