import * as express from 'express';
import { UsersController } from '@controllers/users/users.controller';

const users_router = express.Router();
const users_controller = new UsersController();

users_router.route('/check_login')
    .post((req: express.Request, res: express.Response) => users_controller.check_login(req, res));
users_router.route('/login')
    .post((req: express.Request, res: express.Response) => users_controller.login(req, res, false));
users_router.route('/login_admin')
    .post((req: express.Request, res: express.Response) => users_controller.login(req, res, false));
users_router.route('/register')
    .post((req: express.Request, res: express.Response) => users_controller.register(req, res));
/*
users_router.route('/change_info')
    .post((req: express.Request, res: express.Response) => users_controller.change_info(req, res));
users_router.route('/get_info')
    .post((req: express.Request, res: express.Response) => users_controller.get_info(req, res));
users_router.route('/forgotten_password')
    .post((req: express.Request, res: express.Response) => users_controller.forgotten_password(req, res));
users_router.route('/change_user_password')
    .post((req: express.Request, res: express.Response) => users_controller.change_user_password(req, res));
users_router.route('/change_forgotten_password')
    .post((req: express.Request, res: express.Response) => users_controller.change_forgotten_password(req, res));
users_router.route('/logout')
    .post((req: express.Request, res: express.Response) => users_controller.logout(req, res));
*/

export default users_router;
