import { Appointment } from "../models/appointment.model";
import api from "../configs/axios/http-common";
import { AppointmentFilter, PageableFilter } from "../vo/types/filters";
import { Page } from "../vo/types/types";

const APPOINTMENT_PATH: string = 'appointment';

export const createAppointment = (appointment: Appointment): Promise<Appointment> => {
    return api.post<Appointment>(APPOINTMENT_PATH, appointment)
        .then(response => response.data);
}

export const findAllByPerson = (appointmentFilter: PageableFilter<AppointmentFilter>): Promise<Page<Appointment>> => {
    return api.get<Page<Appointment>>(APPOINTMENT_PATH, { params: appointmentFilter })
        .then(response => response.data);
}

export const updateAppointment = (appointment: Appointment): Promise<Appointment> => {
    return api.put<Appointment>(APPOINTMENT_PATH, appointment)
        .then(response => response.data);
}