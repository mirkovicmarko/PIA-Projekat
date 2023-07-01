import mongoose from "mongoose";
import PositionModel from "./Room/Position";
import DoorModel from "./Room/Door";


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
    }
}, { autoCreate: false, autoIndex: false });

export default mongoose.model('objectRoomModel', RoomSchema);
