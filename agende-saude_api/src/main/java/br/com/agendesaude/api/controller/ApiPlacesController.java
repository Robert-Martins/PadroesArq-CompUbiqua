package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.dto.LocationRequestDto;
import br.com.agendesaude.api.domain.service.ApiPlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/places")
public class ApiPlacesController {

    @Autowired
    private ApiPlacesService apiPlacesService;

    @PostMapping("/searchNearby")
    public String getPlaces(@RequestBody LocationRequestDto locationRequest) {
        Double latitude = locationRequest.latitude();
        Double longitude = locationRequest.longitude();
        return apiPlacesService.getPlaces(latitude, longitude);
    }
}






