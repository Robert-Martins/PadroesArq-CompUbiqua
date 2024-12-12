import { AxiosResponse } from "axios";
import { AgendeSaudeEnumsNames } from "../vo/consts/app.enums";
import { Enum } from "../vo/types/types";
import api from "../configs/axios/http-common";

const APPLICATION_PATH: string = 'application';

export const findEnumByName = (name: AgendeSaudeEnumsNames): Promise<AxiosResponse<Enum>> => {
    return api.get(`${APPLICATION_PATH}/enum-by-name/${name}`);
}