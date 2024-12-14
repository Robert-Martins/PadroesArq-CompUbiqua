import api from "../configs/axios/http-common";
import { Consultation } from "../models/consultation.model";
import { Page } from "../vo/types/types";
import { ConsultationFilter, PageableFilter } from "../vo/types/filters";
import { createRequestParams } from "../utils/utils";

const CONSULTATION_PATH: string = 'consultation';

export const findAllCommonConsultations = (consultationFilter: PageableFilter<ConsultationFilter>): Promise<Page<Consultation>> => {
    return api.get<Page<Consultation>>(CONSULTATION_PATH, { params: createRequestParams(consultationFilter) })
        .then(response => response.data);
}

export const findConsultationById = (id: number): Promise<Consultation> => {
    return api.get<Consultation>(`${CONSULTATION_PATH}/${id}`)
        .then(response => response.data);
}

export const findAllCommonConsultationsByLocationId = (locationId: number): Promise<Page<Consultation>> => {
    return api.get<Page<Consultation>>(`${CONSULTATION_PATH}/location/${locationId}`)
        .then(response => response.data);
}