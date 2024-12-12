import { AxiosResponse } from "axios";
import { AuthenticationRequest, AuthenticationResponse, PasswordReset } from "../vo/types/types";
import api from "../configs/axios/http-common";

const AUTH_PATH: string = 'auth';

export const login = (authenticationRequest: AuthenticationRequest): Promise<AxiosResponse<AuthenticationResponse>> => {
    return api.post<AuthenticationResponse>(`${AUTH_PATH}/login`, authenticationRequest);
}

export const refreshToken = (refreshToken: string): Promise<AxiosResponse<AuthenticationResponse>> => {
    return api.post<AuthenticationResponse>(`${AUTH_PATH}/refresh-token`, { refreshToken });
}

export const passwordResetFlow = (email: string): Promise<AxiosResponse<void>> => {
    return api.post<void>(`${AUTH_PATH}/password-reset-request`, { email });
}

export const passwordReset = (passwordReset: PasswordReset): Promise<AxiosResponse<void>> => {
    return api.post<void>(`${AUTH_PATH}/password-reset`, passwordReset);
}