import api from "../configs/axios/http-common"
import { Media } from "../models/media.model"

const MEDIA_PATH: string = 'media'

export const createMedia = (file: File): Promise<Media> => {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return api.post<Media>(MEDIA_PATH, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data);
}

export const updateMedia = (id: number, file: File): Promise<Media> => {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return api.put<Media>(`${MEDIA_PATH}/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data);
}

export const deleteMedia = (id: number): Promise<void> => {
    return api.delete(`${MEDIA_PATH}/${id}`)
        .then(response => response.data);
}