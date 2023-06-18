import check_login_impl from "@controllers/users/check_login";
import login_impl from "@controllers/users/login";
import register_impl from "@controllers/users/register";

export class UsersController {
    check_login = check_login_impl;
    login = login_impl;
    register = register_impl;
    //change_info = change_info_impl;
    //get_info = get_info_impl;
    //forgotten_password = forgotten_password_impl;
    //change_user_password = change_user_password_impl;
    //change_forgotten_password = change_forgotten_password_impl;
    //logout = logout_impl;
}