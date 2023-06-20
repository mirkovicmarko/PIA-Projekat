import check_login_impl from "@controllers/users/implementations/check_login";
import login_impl from "@controllers/users/implementations/login";
import register_impl from "@controllers/users/implementations/register";
import forgotten_password_impl from "@controllers/users/implementations/forgotten_password";
import change_forgotten_password_impl from "@controllers/users/implementations/change_forgotten_password";
import change_password_impl from "@controllers/users/implementations/change_password";
import get_info_impl from "@controllers/users/implementations/get_info";
//import change_info_impl from "@controllers/users/implementations/change_info";
import logout_impl from "@controllers/users/implementations/logout";

export class UsersController {
    check_login = check_login_impl;
    login = login_impl;
    register = register_impl;
    forgotten_password = forgotten_password_impl;
    change_forgotten_password = change_forgotten_password_impl;
    change_password = change_password_impl;
    get_info = get_info_impl;
    //change_info = change_info_impl;
    logout = logout_impl;
}