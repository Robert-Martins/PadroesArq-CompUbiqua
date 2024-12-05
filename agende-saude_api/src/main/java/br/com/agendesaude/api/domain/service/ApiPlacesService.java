package br.com.agendesaude.api.domain.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import br.com.agendesaude.api.infra.utils.ApiPlacesRequestBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ApiPlacesService {

    @Value("${google.api.key}")
    private String apiKey;

    public String getPlaces(Double latitude, Double longitude) {

        String jsonRequest = ApiPlacesRequestBuilder.buildRequestJson(latitude, longitude);

        HttpClient client = HttpClient.newHttpClient();

        String apiUrl = "https://places.googleapis.com/v1/places:searchNearby";
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("X-Goog-Api-Key", apiKey)
                .header("Content-Type", "application/json")
                .header("X-Goog-FieldMask", "places.displayName")
                .header("X-Goog-FieldMask", "places.googleMapsUri")
                .header("X-Goog-FieldMask", "places.formattedAddress")
                .header("X-Goog-FieldMask", "places.currentOpeningHours")
                .header("X-Goog-FieldMask", "places.nationalPhoneNumber")
                .POST(HttpRequest.BodyPublishers.ofString(jsonRequest))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Erro ao consumir API: " + e.getMessage(), e);
        }
    }
}
