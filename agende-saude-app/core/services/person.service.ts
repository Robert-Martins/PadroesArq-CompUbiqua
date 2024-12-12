import { AxiosResponse } from "axios";
import api from "../configs/axios/http-common";
import { Person } from "../models/person.model";

const PERSON_PATH: string = 'person';

export const createPerson = (person: Person): Promise<AxiosResponse<Person>> => {
    return api.post<Person>(PERSON_PATH, person);
}

export const findPersonById = (id: number): Promise<AxiosResponse<Person>> => {
    return api.get<Person>(`${PERSON_PATH}/${id}`);
}

export const existsByTaxId = (taxId: string): Promise<AxiosResponse<boolean>> => {
    return api.get<boolean>(`${PERSON_PATH}/exists-by-tax-id/${taxId}`);
}

export const updatePerson = (person: Person): Promise<AxiosResponse<void>> => {
    return api.put<void>(`${PERSON_PATH}/${person.id}`, person);
}