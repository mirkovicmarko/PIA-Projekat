import { USER_TYPES } from "@consts";
import mongoose from "mongoose";
import ClientSchema from "./User/Client";
import AgencySchema from "./User/Agency";
import VerificationSchema from "./User/Verification";


const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true,
        enum: Object.keys(USER_TYPES)
    },
    profile_picture: {
        type: String,
        default: null
    },

    client: {
        type: ClientSchema,
        default: null
    },
    agency: {
        type: AgencySchema,
        default: null
    },
    verification: {
        type: VerificationSchema,
        default: null
    }
});

export default mongoose.model('userModel', UserSchema, 'Users');
