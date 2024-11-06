package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.input.CreateUserDto;
import br.com.agendesaude.api.domain.dto.input.UpdateUserDto;
import br.com.agendesaude.api.domain.dto.output.GetUserDto;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity create(@RequestBody @Valid CreateUserDto userDto, UriComponentsBuilder uriBuilder) {
        var user = new User(userDto);
        repository.save(user);

        var uri = uriBuilder.path("/usuarios/{id}").buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(uri).body(new GetUserDto(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity read(@PathVariable Long id) {
        var user = repository.getReferenceById(id);
        return ResponseEntity.ok(new GetUserDto(user));
    }

    @GetMapping
    public ResponseEntity<Page<GetUserDto>> readAll(@PageableDefault(size = 5, sort={"id"}) Pageable pageable) {
        var page = repository.findAllByActiveTrue(pageable)
                .map(GetUserDto::new);

        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity update(@RequestBody @Valid UpdateUserDto userDto) {
        var usuario = repository.getReferenceById(userDto.id());
        usuario.updateInformations(userDto);

        return ResponseEntity.ok(new GetUserDto(usuario));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity delete(@PathVariable Long id) {
        var user = repository.getReferenceById(id);
        user.delete();

        return ResponseEntity.noContent().build();
    }
}
