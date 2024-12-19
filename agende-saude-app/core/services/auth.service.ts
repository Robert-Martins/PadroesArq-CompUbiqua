import { AuthenticationRequest, AuthenticationResponse, PasswordReset } from "../vo/types/types";
import api from "../configs/axios/http-common";

const AUTH_PATH: string = 'auth';

export const REFRESH_TOKEN_PATH: string = `refresh-token`;

export const authenticate = (authenticationRequest: AuthenticationRequest): Promise<AuthenticationResponse> => {
    return api.post<AuthenticationResponse>(`${AUTH_PATH}/login`, authenticationRequest)
        .then(response => response.data);
}

export const refreshToken = (refreshToken: string): Promise<AuthenticationResponse> => {
    return api.post<AuthenticationResponse>(`${AUTH_PATH}/${REFRESH_TOKEN_PATH}`, { refreshToken })
        .then(response => response.data);
}

export const passwordResetFlow = (email: string): Promise<void> => {
    return api.post<void>(`${AUTH_PATH}/password-reset-request`, { email })
        .then(response => response.data);
}

export const passwordReset = (passwordReset: PasswordReset): Promise<void> => {
    return api.post<void>(`${AUTH_PATH}/password-reset`, passwordReset)
        .then(response => response.data);
}