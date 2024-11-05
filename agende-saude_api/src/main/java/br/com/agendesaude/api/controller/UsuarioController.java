package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.input.AtualizacaoUsuarioDto;
import br.com.agendesaude.api.domain.dto.input.CadastroUsuarioDto;
import br.com.agendesaude.api.domain.dto.output.DetalhamentoUsuarioDto;
import br.com.agendesaude.api.domain.dto.output.ListagemUsuarioDto;
import br.com.agendesaude.api.domain.model.Usuario;
import br.com.agendesaude.api.domain.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid CadastroUsuarioDto dados, UriComponentsBuilder uriBuilder) {
        var usuario = new Usuario(dados);
        repository.save(usuario);

        var uri = uriBuilder.path("/usuarios/{id}").buildAndExpand(usuario.getId()).toUri();

        return ResponseEntity.created(uri).body(new DetalhamentoUsuarioDto(usuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity detalhar(@PathVariable Long id) {
        var usuario = repository.getReferenceById(id);
        return ResponseEntity.ok(new DetalhamentoUsuarioDto(usuario));
    }

    @GetMapping
    public ResponseEntity<Page<ListagemUsuarioDto>> listar(@PageableDefault(size = 5, sort={"id"}) Pageable paginacao) {
        var page = repository.findAllByAtivoTrue(paginacao)
                .map(ListagemUsuarioDto::new);

        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody @Valid AtualizacaoUsuarioDto dados) {
        var usuario = repository.getReferenceById(dados.id());
        usuario.atualizarInformacoes(dados);

        return ResponseEntity.ok(new DetalhamentoUsuarioDto(usuario));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable Long id) {
        var usuario = repository.getReferenceById(id);
        usuario.excluir();

        return ResponseEntity.noContent().build();
    }
}
