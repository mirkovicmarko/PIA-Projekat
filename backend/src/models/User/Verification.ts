import mongoose from "mongoose";


const VerificationSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { _id: false });

export default VerificationSchema;