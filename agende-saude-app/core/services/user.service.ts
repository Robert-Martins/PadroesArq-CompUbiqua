import { AxiosResponse } from "axios";
import api from "../configs/axios/http-common";
import { Person } from "../models/person.model";

const USER_PATH: string = 'user';

export const findCurrentUser = (): Promise<AxiosResponse<Person | Location>> => {
    return api.get<Person | Location>(`${USER_PATH}/current`);
}