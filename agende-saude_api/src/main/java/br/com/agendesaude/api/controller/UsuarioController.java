package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.dto.input.CadastroUsuarioDto;
import br.com.agendesaude.api.dto.output.ListagemUsuarioDto;
import br.com.agendesaude.api.entity.Usuario;
import br.com.agendesaude.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    @Transactional
    public void cadastrar(@RequestBody @Valid CadastroUsuarioDto dados) {
        repository.save(new Usuario(dados.nome(), dados.email(), dados.senha()));
    }

    @GetMapping
    public List<ListagemUsuarioDto> listar() {
        return repository.findAll().stream()
                .map(usuario -> new ListagemUsuarioDto(usuario.getNome(), usuario.getEmail()))
                .toList();
    }
}
