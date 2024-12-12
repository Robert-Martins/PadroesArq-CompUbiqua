import { AxiosResponse } from "axios";
import api from "../configs/axios/http-common";
import { Consultation } from "../models/consultation.model";
import { Page } from "../vo/types/types";
import { ConsultationFilter, PageableFilter } from "../vo/types/filters";
import { createRequestParams } from "../utils/utils";

const CONSULTATION_PATH: string = 'consultation';

export const findAllCommonConsultations = (consultationFilter: PageableFilter<ConsultationFilter>): Promise<AxiosResponse<Page<Consultation>>> => {
    return api.get<Page<Consultation>>(CONSULTATION_PATH, { params: createRequestParams(consultationFilter) });
}

export const findConsultationById = (id: number): Promise<AxiosResponse<Consultation>> => {
    return api.get<Consultation>(`${CONSULTATION_PATH}/${id}`);
}

export const findAllCommonConsultationsByLocationId = (locationId: number): Promise<AxiosResponse<Page<Consultation>>> => {
    return api.get<Page<Consultation>>(`${CONSULTATION_PATH}/location/${locationId}`);
}