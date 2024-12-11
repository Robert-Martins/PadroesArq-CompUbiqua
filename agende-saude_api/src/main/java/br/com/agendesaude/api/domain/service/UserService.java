package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.UserDto;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;



}
