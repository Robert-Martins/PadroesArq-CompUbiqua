import { AxiosResponse } from "axios";
import { Screening } from "../models/screening.model";
import api from "../configs/axios/http-common";

const SCREENING_PATH: string = 'screening';

export const sendScreeningAnswers = (screening: Screening): Promise<AxiosResponse<Screening>> => {
    return api.post(`${SCREENING_PATH}/answers`, screening);
}

export const getScreeningQuestions = (): Promise<AxiosResponse<string[]>> => {
    return api.get(`${SCREENING_PATH}/questions`);
}