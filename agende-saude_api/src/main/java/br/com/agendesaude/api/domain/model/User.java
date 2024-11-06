package br.com.agendesaude.api.domain.model;

import br.com.agendesaude.api.domain.dto.input.CreateUserDto;
import br.com.agendesaude.api.domain.dto.input.UpdateUserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_users")
@Getter
@EqualsAndHashCode (of = "id")
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String login;
    private String password;
    private Boolean active;

    public User(CreateUserDto userDto) {
        this.name = userDto.name();
        this.login = userDto.login();
        this.password = userDto.password();
        this.active = true;
    }

    public void updateInformations(UpdateUserDto userDto) {
        if (userDto.name() != null) {
            this.name = userDto.name();
        }
        if (userDto.login() != null) {
            this.login = userDto.login();
        }
        if (userDto.password() != null) {
            this.password = userDto.password();
        }
    }

    public void delete() {
        this.active = false;
    }
}
