import * as SecureStore from 'expo-secure-store';
import { AuthenticationResponse } from '../vo/types/types';

const ACCESS_TOKEN_KEY: string = 'agenda-saude-access-token';
const REFRESH_TOKEN_KEY: string = 'agenda-saude-refresh-token';

export const getToken = (): Promise<string | null> => {
    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export const setToken = (token: string): Promise<void> => {
    return SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export const removeToken = (): Promise<void> => {
    return SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

export const getRefreshToken = (): Promise<string | null> => {
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export const setRefreshToken = (token: string): Promise<void> => {
    return SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

export const removeRefreshToken = (): Promise<void> => {
    return SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

export const setTokens = (tokens: AuthenticationResponse): Promise<void> => {
    return setToken(tokens.accessToken)
        .then(() => setRefreshToken(tokens.refreshToken));
}

export const removeTokens = (): Promise<void> => {
    return SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
        .then(() => SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY));
}