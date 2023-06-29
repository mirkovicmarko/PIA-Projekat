import { OBJECT_TYPES } from "@shared/consts";


export class ObjectRoomDoor {
    _id: string;
    position: {
        x: number;
        y: number;
    }
}

export class ObjectRoom {
    _id: string;
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    doors: ObjectRoomDoor[] = [];
}

export default class Object {
    _id: string;
    type: string = OBJECT_TYPES.flat;
    address: string = "";
    rooms: ObjectRoom[] = [];
    quadrature: number = 1;
    owner: number;
}
