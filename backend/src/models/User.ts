import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    _id: ObjectId,
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
        required: true
    },
    profile_picture: {
        type: String,
        default: null
    },

    client: {
        type: {
            first_name: {
                type: String,
                required: true
            },
            last_name: {
                type: String,
                required: true
            }
        },
        default: null
    },

    agency: {
        type: {
            name: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        },
        default: null
    },

    verification: {
        code: {
            type: String,
            default: null
        },
        time: {
            type: String,
            default: null
        }
    }
});

export default mongoose.model('userModel', UserModel, 'Users');
