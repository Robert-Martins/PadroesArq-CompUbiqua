package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.input.UserDto;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Transactional
    public UserDto createUser(UserDto userDto) {
        User user = new User(userDto);
        repository.save(user);
        return new UserDto(user);
    }

    public UserDto getUserById(Long id) {
        User user = repository.getReferenceById(id);
        return new UserDto(user);
    }

    public Page<UserDto> getAllUsers(Pageable pageable) {
        Page<User> page = repository.findAllByActiveTrue(pageable);
        return page.map(UserDto::new);
    }

    @Transactional
    public UserDto updateUser(UserDto userDto) {
        User user = repository.getReferenceById(userDto.id());
        user.updateInformations(userDto);
        return new UserDto(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = repository.getReferenceById(id);
        user.delete();
    }
}
