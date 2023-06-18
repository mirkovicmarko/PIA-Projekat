import { USER_TYPES } from "@shared/consts";

export default class User {
    _id: number;
    username: string = "";
    password: string = "";
    phone_number: string = "";
    email: string = "";
    approved: boolean;
	banned: boolean;
    type: string = USER_TYPES.client;
    profile_picture: string = null;

    client: {
        first_name: string,
        last_name: string
    } = {
        first_name: "",
        last_name: ""
    };

    agency: {
        name: string,
        address: string,
        id: string,
        description: string
    } = {
        name: "",
        address: "",
        id: "",
        description: ""
    };
};
