import { AxiosError, AxiosResponse } from "axios";

export const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
}

export const errorHandler = (error: AxiosError | Error): Promise<AxiosError> => {
    return Promise.reject(error);
}