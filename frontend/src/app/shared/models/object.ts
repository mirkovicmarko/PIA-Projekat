import { OBJECT_TYPES } from "@shared/consts";

export class ObjectRoomDoor {
    x: number;
    y: number;
}

export class ObjectPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class ObjectRoom {
    position: ObjectPosition = new ObjectPosition();
    done: boolean = false;
    doors: ObjectRoomDoor[] = [];
}

export default class Object {
    _id: number;
    type: string = OBJECT_TYPES.flat;
    address: string = "";
    rooms: ObjectRoom[] = [];
    quadrature: number = 1;
    owner: number;
}
