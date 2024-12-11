package br.com.agendesaude.api.domain.service;

import br.com.agendesaude.api.domain.dto.LocationDto;
import br.com.agendesaude.api.domain.model.Location;
import br.com.agendesaude.api.domain.model.User;
import br.com.agendesaude.api.domain.repository.LocationRepository;
import br.com.agendesaude.api.domain.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Long createLocation(LocationDto locationDto) {
        User user = userRepository.findById(locationDto.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Location location = locationDto.mapDtoToEntity();
        location.setUser(user);
        locationRepository.save(location);
        return location.getId();
    }

    @Transactional(readOnly = true)
    public LocationDto getLocationById(Long id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Location not found"));
        LocationDto locationDto = new LocationDto();
        locationDto.setId(location.getId());
        locationDto.setName(location.getName());
        locationDto.setUser(location.getUser());
        locationDto.setThumbnail(location.getThumbnail());
        locationDto.setAddress(location.getAddress());
        locationDto.setCreatedAt(location.getCreatedAt());
        locationDto.setUpdatedAt(location.getUpdatedAt());
        return locationDto;
    }

    @Transactional
    public void updateLocation(Long id, LocationDto locationDto) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Location not found"));

        location.setName(locationDto.getName());
        location.setThumbnail(locationDto.getThumbnail());
        location.setAddress(locationDto.getAddress());
        locationRepository.save(location);
    }

//    @Transactional
//    public void deleteLocation(Long id) {
//        Location location = locationRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Location not found"));
//
//        if (location.getConsultations() != null && !location.getConsultations().isEmpty()) {
//            throw new IllegalStateException("Cannot delete location with associated consultations");
//        }
//
//        locationRepository.delete(location);
//    }
}
