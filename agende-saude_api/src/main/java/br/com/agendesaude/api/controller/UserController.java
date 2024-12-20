package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.LocationDto;
import br.com.agendesaude.api.domain.dto.PersonDto;
import br.com.agendesaude.api.domain.enums.UserType;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.service.LocationService;
import br.com.agendesaude.api.domain.service.PersonService;
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
  private LocationService locationService;

  @Autowired
  private PersonService personService;

  @Autowired
  private UserService userService;

  @GetMapping("/current")
  public ResponseEntity<Object> findCurrent(Authentication principal) {

    if (principal != null) {
      User user = (User) principal.getPrincipal();
      if (user.getType().equals(UserType.PERSON)) {
        PersonDto personDto = personService.findByUserId(user.getId());
        return ResponseEntity.ok(personDto);
      } else if (user.getType().equals(UserType.LOCATION)) {
        LocationDto locationDto = locationService.findByUserId(user.getId());
        return ResponseEntity.ok(locationDto);
      }
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }

}
