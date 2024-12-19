package br.com.agendesaude.api.domain.repository;

import br.com.agendesaude.api.domain.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, Long> {
}
