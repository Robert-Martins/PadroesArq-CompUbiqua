package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.UserDto;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/current")
  public ResponseEntity<UserDto> findCurrent(Authentication principal) {
    if (principal != null) {
      UserDto userDto = ((User) principal.getPrincipal()).mapEntityToDto();
      return ResponseEntity.ok(userDto);
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }


}
