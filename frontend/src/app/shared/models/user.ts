export default class User {
    _id: number;
    username: string = "";
    password: string = "";
    phone_number: string = "";
    email: string = "";
    approved: boolean;
	banned: boolean;
    type: string = "";
    profile_picture: string = null;

    client: {
        first_name: string,
        last_name: string
    } = null;

    agency: {
        name: string,
        address: string,
        id: string,
        description: string
    } = null;
};
