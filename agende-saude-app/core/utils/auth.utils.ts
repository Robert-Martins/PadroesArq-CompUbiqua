import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY: string = 'agenda-saude-token';

export const getToken = (): Promise<string | null> => {
    return SecureStore.getItemAsync(TOKEN_KEY);
}

export const setToken = (token: string): Promise<void> => {
    return SecureStore.setItemAsync(TOKEN_KEY, token);
}

export const removeToken = (): Promise<void> => {
    return SecureStore.deleteItemAsync(TOKEN_KEY);
}