package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.input.UserDto;
import br.com.agendesaude.api.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.validation.annotation.Validated;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> create(@Validated(UserDto.Create.class) @RequestBody UserDto userDto, UriComponentsBuilder uriBuilder) {
        UserDto createdUser = userService.createUser(userDto);

        var uri = uriBuilder.path("/users/{id}").buildAndExpand(createdUser.id()).toUri();
        return ResponseEntity.created(uri).body(createdUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> read(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<Page<UserDto>> readAll(@PageableDefault(size = 5, sort = {"id"}) Pageable pageable) {
        Page<UserDto> usersPage = userService.getAllUsers(pageable);
        return ResponseEntity.ok(usersPage);
    }

    @PutMapping
    public ResponseEntity<UserDto> update(@Validated(UserDto.Update.class) @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
