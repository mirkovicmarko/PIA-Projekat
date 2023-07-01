import mongoose from "mongoose";
import PositionModel from "./Room/Position";
import DoorModel from "./Room/Door";
import { ROOM_RECONSTRUCTION_STATUSES } from "@consts";


const RoomSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    position: {
        type: PositionModel.schema,
        required: true
    },
    doors: {
        type: [DoorModel.schema],
        default: []
    },
    reconstruction_status: {
        type: String,
        enum: Object.keys(ROOM_RECONSTRUCTION_STATUSES),
        default: ROOM_RECONSTRUCTION_STATUSES.done
    }
}, { autoCreate: false, autoIndex: false });

export default mongoose.model('objectRoomModel', RoomSchema);
