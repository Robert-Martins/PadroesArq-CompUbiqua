import { REFRESH_TOKEN_PATH, refreshToken } from "@/core/services/auth.service";
import { getRefreshToken, setTokens } from "@/core/utils/auth.utils";
import { Optional } from "@/core/utils/optional";
import { AuthenticationResponse } from "@/core/vo/types/types";
import axios, { AxiosError, AxiosResponse } from "axios";

export const handleAxiosError = (error: AxiosError): void => {
    const { status } = error.response as AxiosResponse ?? {};
    if(status === 401)
        onUnauthorized(error);
    else if(status < 500)
        handleAppError(error);
    else
        handleError(error);
}

const onUnauthorized = async (error: AxiosError): Promise<void> => {
    const originalRequest = error.config;

    const isRefreshTokenRequest: boolean = Optional.ofNullable(originalRequest)
        .map(req => req.url.includes(REFRESH_TOKEN_PATH))
        .orElse(false);

    if(!isRefreshTokenRequest)
        performRefreshTokenFlow()
            .then(response => originalRequest.headers['Authorization'] = `Bearer ${response.accessToken}`)
            .then(() => axios(originalRequest));
}

const performRefreshTokenFlow = async (): Promise<AuthenticationResponse> => {
    const refreshTokenValue = await getRefreshToken();
    const response = await refreshToken(refreshTokenValue);
    await setTokens(response);
    return response;
}

const handleAppError = (error: AxiosError): void => {
    console.log({
        message: "Application Error",
        error: error
    })
}

export const handleError = (error: Error): void => {
    console.log({
        message: "Request Error",
        error: error
    })
}