import check_login from "@controllers/users/implementations/check_login";
import login from "@controllers/users/implementations/login";
import register from "@controllers/users/implementations/register";
import forgotten_password from "@controllers/users/implementations/forgotten_password";
import change_forgotten_password from "@controllers/users/implementations/change_forgotten_password";
import change_password from "@controllers/users/implementations/change_password";
import get_info from "@controllers/users/implementations/get_info";
import change_info from "@controllers/users/implementations/change_info";
import logout from "@controllers/users/implementations/logout";
import get_all from "./implementations/get_all";
import ban from "./implementations/ban";
import allow from "./implementations/allow";

export default class UsersController {
    check_login = check_login;
    login = login;
    register = register;
    forgotten_password = forgotten_password;
    change_forgotten_password = change_forgotten_password;
    change_password = change_password;
    get_info = get_info;
    change_info = change_info;
    logout = logout;
    get_all = get_all;
    ban = ban;
    allow = allow;
}
