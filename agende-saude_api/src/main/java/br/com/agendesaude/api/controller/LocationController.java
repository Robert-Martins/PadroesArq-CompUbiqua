package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.LocationDto;
import br.com.agendesaude.api.domain.service.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {

  @Autowired
  private LocationService locationService;

  @GetMapping
  public ResponseEntity<Page<LocationDto>> findAllLocations(Pageable pageable) {
    Page<LocationDto> result = locationService.findAllLocations(pageable);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/{id}")
  public ResponseEntity<LocationDto> findLocationById(@PathVariable Long id) {
    LocationDto locationDto = locationService.getLocationById(id);
    return ResponseEntity.ok(locationDto);
  }

  @PostMapping
  public ResponseEntity<LocationDto> createLocation(@Valid @RequestBody LocationDto locationDto) {
    LocationDto createdLocation = locationService.createLocation(locationDto);
    return ResponseEntity.ok(createdLocation);
  }

  @PutMapping
  public ResponseEntity<LocationDto> updateLocation(@Valid @RequestBody LocationDto locationDto) {
    LocationDto updatedLocation = locationService.updateLocation(locationDto);
    return ResponseEntity.ok(updatedLocation);
  }
}
