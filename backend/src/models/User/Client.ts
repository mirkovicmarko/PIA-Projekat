import mongoose from "mongoose";


const ClientSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
}, { _id: false });

export default mongoose.model('userClientModel', ClientSchema);