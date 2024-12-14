import { Token } from "../vo/types/types";
import api from "../configs/axios/http-common";

const TOKEN_PATH: string = 'token';

export const validateToken = (token: string): Promise<Token> => {
    return api.post<Token>(`${TOKEN_PATH}/validate`, { token })
        .then(response => response.data);
}