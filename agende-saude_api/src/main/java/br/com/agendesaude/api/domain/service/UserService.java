package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.repository.UserRepository;
import br.com.agendesaude.api.infra.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String taxId) throws UsernameNotFoundException {
    if (taxId == null || taxId.trim().isEmpty()) {
      throw new ValidationException("TaxId is null or empty");
    }

    return userRepository.findByTaxId(taxId)
        .orElseThrow(() -> new ValidationException(
            String.format("No user found with taxId: %s", taxId)));
  }

}
