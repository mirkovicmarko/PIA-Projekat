import mongoose from "mongoose";
import PositionSchema from "./Door/Position";


const DoorSchema = new mongoose.Schema({
    position: {
        type: PositionSchema,
        required: true
    }
}, { _id: false });

export default DoorSchema;