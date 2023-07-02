import { OBJECT_TYPES, CONSTRUCTION_STATUSES } from "@shared/consts";


export class ObjectRoomDoor {
    _id: string;
    position: {
        x: number;
        y: number;
    } = { x: 0, y: 0 };
}

export class ObjectRoom {
    _id: string;
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    } = { x: 0, y: 0, width: 0, height: 0 };
    doors: ObjectRoomDoor[] = [];
    reconstruction_status = CONSTRUCTION_STATUSES.done;
}

export default class Object {
    _id: string;
    type: string = OBJECT_TYPES.flat;
    address: string = "";
    rooms: ObjectRoom[] = [];
    quadrature: number = 1;
    owner: number;
    status: string;
}
