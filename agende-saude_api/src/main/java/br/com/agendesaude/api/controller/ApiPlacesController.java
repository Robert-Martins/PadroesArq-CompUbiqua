package br.com.agendesaude.api.controller;

import br.com.agendesaude.api.domain.service.ApiPlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/places")
public class ApiPlacesController {

    @Autowired
    private ApiPlacesService apiPlacesService;

    @PostMapping("/buscar-locais")
    public String buscarLocais() {
        // Chama o serviço que faz a requisição para a API do Google Places
        return apiPlacesService.obterDados();
    }
}






