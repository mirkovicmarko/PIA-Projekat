import { MAX_ROOMS, MIN_ROOMS, OBJECT_TYPES } from "@consts";
import mongoose from "mongoose";


class ObjectRoomDoor {
    x: number;
    y: number;
}

class ObjectPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

class ObjectRoom {
    position: ObjectPosition = new ObjectPosition();
    done: boolean = false;
    doors: ObjectRoomDoor[] = [];
}

const ObjectModel = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.keys(OBJECT_TYPES)
    },
    address: {
        type: String,
        required: true
    },
    rooms: {
        type: Array<ObjectRoom>,
        required: true,
        validate: (rooms) => {
            return rooms.length >= MIN_ROOMS && rooms.length <= MAX_ROOMS;
        }
    },
    quadrature: {
        type: Number,
        required: true,
        min: 1
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});


export default mongoose.model('objectModel', ObjectModel, 'Objects');
