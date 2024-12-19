import { Address } from "./address.model";

export class User {

    constructor(
        public id: number = null,
        public taxId: string = null,
        public email: string = null,
        public phone: string = null,
        public password: string = null,
        public userType: string = null,
        public accessLevelType: string = null,
        public isActive: boolean = null,
        public address: Address = null,
        public createdAt: Date = null,
        public updatedAt: Date = null
    ) { }

}