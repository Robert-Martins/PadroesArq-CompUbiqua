import { getToken } from "@/core/utils/auth.utils";
import { Optional } from "@/core/utils/optional";
import { InternalAxiosRequestConfig } from "axios";

export const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    Optional.ofNullable(await getToken())
        .ifPresent(token => config.headers['Authorization'] = `Bearer ${token}`);
    return config;
}