import api from "../configs/axios/http-common"
import { Media } from "../models/media.model"

const MEDIA_PATH: string = 'media'

export const createMedia = (media: Media): Promise<Media> => {
    return api.post(MEDIA_PATH, media)
        .then(response => response.data);
}

export const deleteMedia = (id: number): Promise<void> => {
    return api.delete(`${MEDIA_PATH}/${id}`)
        .then(response => response.data);
}