import { AxiosResponse } from "axios";
import { Appointment } from "../models/appointment.model";
import api from "../configs/axios/http-common";
import { AppointmentFilter, PageableFilter } from "../vo/types/filters";
import { Page } from "../vo/types/types";

const APPOINTMENT_PATH: string = 'appointment';

export const createAppointment = (appointment: Appointment): Promise<AxiosResponse<Appointment>> => {
    return api.post<Appointment>(APPOINTMENT_PATH, appointment);
}

export const findAllByPerson = (appointmentFilter: PageableFilter<AppointmentFilter>): Promise<AxiosResponse<Page<Appointment>>> => {
    return api.get<Page<Appointment>>(APPOINTMENT_PATH, { params: appointmentFilter });
}

export const updateAppointment = (appointment: Appointment): Promise<AxiosResponse<Appointment>> => {
    return api.put<Appointment>(APPOINTMENT_PATH, appointment);
}