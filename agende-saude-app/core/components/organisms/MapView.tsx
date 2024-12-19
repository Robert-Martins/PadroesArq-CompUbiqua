import { MapViewProps } from '@/core/vo/types/components.props';
import React from 'react';
import { View, StyleSheet, Text, Linking, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';

const CustomMapView: React.FC<MapViewProps> = (props) => {
    const { address } = props;

    if (!address.latitude || !address.longitude) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Endereço inválido ou sem coordenadas.</Text>
            </View>
        );
    }

    const handleOpenInGoogleMaps = () => {
        const { latitude, longitude } = address;
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(googleMapsUrl).catch(() =>
            Alert.alert(
                'Erro',
                'Não foi possível abrir o Google Maps. Verifique sua conexão ou instale o aplicativo.'
            )
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: address.latitude,
                    longitude: address.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <UrlTile
                    urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                />
                <Marker
                    coordinate={{
                        latitude: address.latitude,
                        longitude: address.longitude,
                    }}
                    title={address.address || 'Endereço'}
                    description={`${address.neighborhood || ''}, ${address.city || ''}, ${address.state || ''}`}
                />
            </MapView>
            <TouchableOpacity style={styles.button} onPress={handleOpenInGoogleMaps}>
                <Text style={styles.buttonText}>Abrir no Google Maps</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -75 }],
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default CustomMapView;