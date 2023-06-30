import { USER_TYPES } from "@shared/consts";

class ClientInfo {
    first_name: string = "";
    last_name: string = "";
}

export class Worker {
    _id: string;
    first_name: string = "";
    last_name: string = "";
    email: string = "";
    phone_number: string = "";
    specialty: string = "";
}

class AgencyInfo {
    name: string = "";
    address: string = "";
    id: string = "";
    description: string = "";

    comments: {
        _id: string;
        author: number,
        text: string,
        title: string,
        rating: number
    }[] = [];

    workers: Worker[] = [];
    allowed_workers: number = 0;
    requested_workers: number;
}

export default class User {
    _id: string;

    username: string = "";
    password: string = "";

    phone_number: string = "";
    email: string = "";

    approved: boolean;
	banned: boolean;

    type: string = USER_TYPES.client;

    profile_picture: string = null;

    client: ClientInfo = new ClientInfo();

    agency: AgencyInfo = new AgencyInfo();
};
