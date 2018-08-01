import { BaseEntity } from './../../shared';

export class Mapdetails implements BaseEntity {
    constructor(
        public id?: string,
        public longitude?: string,
        public latitude?: string,
        public label?: string,
        public incompliances?: string,
    ) {
    }
}
