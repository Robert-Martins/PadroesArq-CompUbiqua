package br.com.agendesaude.api.domain.service;

import java.util.Locale;

public class ApiPlacesRequestBuilder {

    public static String buildRequestJson(Double latitude, Double longitude) {
        return String.format(Locale.US, """
            {
                "includedTypes": [
                    "dental_clinic",
                    "dentist",
                    "doctor",
                    "drugstore",
                    "hospital",
                    "medical_lab",
                    "pharmacy",
                    "physiotherapist",
                    "spa"
                ],
                "maxResultCount": 20,
                "locationRestriction": {
                    "circle": {
                        "center": {
                            "latitude": %.6f,
                            "longitude": %.6f
                        },
                        "radius": 10000
                    }
                }
            }
            """, latitude, longitude);
    }
}
