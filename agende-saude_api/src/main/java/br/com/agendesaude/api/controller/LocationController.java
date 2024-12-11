package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.LocationDto;
import br.com.agendesaude.api.domain.service.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping
    public ResponseEntity<Long> createLocation(@Valid @RequestBody LocationDto locationDto) {
        Long id = locationService.createLocation(locationDto);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationDto> getLocation(@PathVariable Long id) {
        LocationDto locationDto = locationService.getLocationById(id);
        return ResponseEntity.ok(locationDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateLocation(@PathVariable Long id, @Valid @RequestBody LocationDto locationDto) {
        locationService.updateLocation(id, locationDto);
        return ResponseEntity.ok().build();
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
//        locationService.deleteLocation(id);
//        return ResponseEntity.ok().build();
//    }
}
