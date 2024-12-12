import { InternalAxiosRequestConfig } from "axios";

export const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
}
