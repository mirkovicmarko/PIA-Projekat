import mongoose from "mongoose";
import PositionModel from "./Door/Position";


const DoorSchema = new mongoose.Schema({
    position: {
        type: PositionModel.schema,
        required: true
    }
}, { _id: false });

export default mongoose.model('objectRoomDoorModel', DoorSchema);