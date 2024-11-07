package br.com.agendesaude.api.domain.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ApiPlacesService {

    @Value("${google.api.url}")
    private String apiUrl;

    @Value("${google.api.key}")
    private String apiKey;

    public String obterDados() {

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("X-Goog-Api-Key", apiKey)
                .header("Content-Type", "application/json")
                .header("X-Goog-FieldMask", "places.displayName")
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Erro ao consumir API: " + e.getMessage(), e);
        }
    }
}
