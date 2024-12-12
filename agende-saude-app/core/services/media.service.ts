import { AxiosResponse } from "axios";
import api from "../configs/axios/http-common"
import { Media } from "../models/media.model"

const MEDIA_PATH: string = 'media'

export const createMedia = (media: Media): Promise<AxiosResponse<Media>> => {
    return api.post(MEDIA_PATH, media);
}

export const deleteMedia = (id: number): Promise<AxiosResponse<void>> => {
    return api.delete(`${MEDIA_PATH}/${id}`);
}