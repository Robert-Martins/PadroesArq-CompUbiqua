package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {

  Location findByUserId(Long userId);

  Page<Location> findByNameContaining(String name, Pageable pageable);

  Page<Location> findByAcceptsEmergencies(Boolean acceptsEmergencies, Pageable pageable);

  Page<Location> findByNameContainingAndAcceptsEmergencies(String name, Boolean acceptsEmergencies, Pageable pageable);
}


