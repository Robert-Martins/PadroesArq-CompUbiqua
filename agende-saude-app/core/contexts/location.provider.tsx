import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Location } from "../vo/types/types";
import * as ExpoLocation from 'expo-location'
import { displayInfoMessage } from "../utils/toast.utils";
import { LOCATION_SERVICE_NOT_ENABLED } from "../vo/consts/messages";

type LocationProviderProps = {
    children: ReactNode;
}

type LocationContextData = {
    getLocation: () => Promise<Location>;
    updateLocation: () => Promise<void>;
    startWatchingLocation: () => void;
    stopWatchingLocation: () => void;
};

const LocationContext = createContext<LocationContextData>({} as LocationContextData);

export const useLocation = () => useContext(LocationContext);

const LocationProvider = ({ children }: LocationProviderProps) => {

    const [location, setLocation] = useState<Location>();
    const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
    const [locationWatcher, setLocationWatcher] = useState<ExpoLocation.LocationSubscription | null>(null);

    useEffect(() => {
        const initializeLocation = async () => {
            const enabled = await checkIfLocationEnabled();
            !enabled && displayInfoMessage(LOCATION_SERVICE_NOT_ENABLED.message, LOCATION_SERVICE_NOT_ENABLED.sub);
            await checkIfPermissionGranted();
        };
        initializeLocation();
    }, []);

    const checkIfLocationEnabled = async (): Promise<boolean> => {
        try {
            if (locationEnabled) 
                return true;
            const enabled = await ExpoLocation.hasServicesEnabledAsync();
            setLocationEnabled(enabled);
            return enabled;
        } catch (error) {
            console.error("Erro ao verificar serviço de localização:", error);
            return false;
        }
    };

    const checkIfPermissionGranted = async (): Promise<boolean> => {
        if(permissionGranted) 
            return true;
        const locationEnabled = await checkIfLocationEnabled();
        if(locationEnabled) {
            const granted = await requestPermission();
            setPermissionGranted(granted);
            return granted;
        }
        return false;
    };

    const requestPermission = async (): Promise<boolean> => {
        try {
            const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            console.error("Erro ao solicitar permissão:", error);
            return false;
        }
    };

    const getLocation = async (): Promise<Location> => {
        if (!location) {
            await updateLocation();
        }
        return location as Location;
    };

    const updateLocation = async (): Promise<void> => {
        try {
            const permissionGranted = await checkIfPermissionGranted();
            if (permissionGranted) {
                const updatedLocation = await ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.LocationAccuracy.Balanced });
                setLocation(updatedLocation as Location);
            }
        } catch (error) {
            console.error("Erro ao atualizar localização:", error);
        }
    };

    const startWatchingLocation = async () => {
        try {
            const permissionGranted = await checkIfPermissionGranted();
            if (permissionGranted) {
                const watcher = await ExpoLocation.watchPositionAsync({}, (watched) => {
                    setLocation(watched as Location);
                });
                setLocationWatcher(watcher);
            }
        } catch (error) {
            console.error("Erro ao iniciar monitoramento de localização:", error);
        }
    };

    const stopWatchingLocation = () => {
        locationWatcher?.remove();
        setLocationWatcher(null);
    };

    return (
        <LocationContext.Provider value={{ getLocation, updateLocation, startWatchingLocation, stopWatchingLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export default LocationProvider;