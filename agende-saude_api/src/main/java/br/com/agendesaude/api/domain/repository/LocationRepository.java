package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LocationRepository extends JpaRepository<Location, Long> {

  Location findByUserId(Long userId);

  Page<Location> findByNameContaining(String name, Pageable pageable);

  Page<Location> findByAcceptsEmergencies(Boolean acceptsEmergencies, Pageable pageable);

  @Query(value = """
    FROM Location l
    """)
  Page<Location> findAllLocations(Pageable pageable);

  @Query(value = """
      FROM Location l
      WHERE (:name IS NULL OR lower(l.name) LIKE %:name%)
      AND (:acceptsEmergencies IS NULL OR l.acceptsEmergencies = :acceptsEmergencies)
      """)
  Page<Location> findByNameContainingAndAcceptsEmergencies(
      @Param("name") String name,
      @Param("acceptsEmergencies") Boolean acceptsEmergencies,
      Pageable pageable
  );

}


