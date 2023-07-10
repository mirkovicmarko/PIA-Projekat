import { JOB_STATUSES } from "@consts";
import mongoose from "mongoose";


const JobSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    status: {
        type: String,
        default: JOB_STATUSES.requested,
        enum: Object.keys(JOB_STATUSES)
    },
    start_date: {
        type: mongoose.Schema.Types.Date,
        required: true,
        min: new Date()
    },
    end_date: {
        type: mongoose.Schema.Types.Date,
        required: true,
        validate: function(value) {
            return value > this.get('start_date');
        },
    },
    agency_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: false,
        min: 0
    },
    cancellation: {
        type: {
            message: {
                type: String,
                required: true
            }
        },
        required: false,
        default: null
    }
}, { autoCreate: false, autoIndex: false });

export default mongoose.model('objectJobModel', JobSchema);