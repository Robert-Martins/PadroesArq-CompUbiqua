import { Media } from "./media.model";
import { User } from "./user.model";

export class Location {

    constructor(
        public id: number = null,
        public name: string = null,
        public accessEmergencies: boolean = null,
        public user: User = null,
        public thumbnail: Media = null,
        public createdAt: Date = null,
        public updatedAt: Date = null
    ) { }

}