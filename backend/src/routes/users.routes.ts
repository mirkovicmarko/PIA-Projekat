import * as express from 'express';
import UsersController from '@controllers/users/users.controller';

const users_router = express.Router();
const users_controller = new UsersController();

users_router.route('/check_login')
    .post((req: express.Request, res: express.Response) => users_controller.check_login(req, res));
users_router.route('/login')
    .post((req: express.Request, res: express.Response) => users_controller.login(req, res, false));
users_router.route('/login_admin')
    .post((req: express.Request, res: express.Response) => users_controller.login(req, res, true));
users_router.route('/register')
    .post((req: express.Request, res: express.Response) => users_controller.register(req, res));
users_router.route('/forgotten_password')
    .post((req: express.Request, res: express.Response) => users_controller.forgotten_password(req, res));
users_router.route('/change_forgotten_password')
    .post((req: express.Request, res: express.Response) => users_controller.change_forgotten_password(req, res));
users_router.route('/change_password')
    .post((req: express.Request, res: express.Response) => users_controller.change_password(req, res));
users_router.route('/logout')
    .post((req: express.Request, res: express.Response) => users_controller.logout(req, res));
users_router.route('/get_info')
    .post((req: express.Request, res: express.Response) => users_controller.get_info(req, res));
users_router.route('/change_info')
    .post((req: express.Request, res: express.Response) => users_controller.change_info(req, res));
users_router.route('/get_all')
    .get((req: express.Request, res: express.Response) => users_controller.get_all(req, res));
users_router.route('/ban')
    .post((req: express.Request, res: express.Response) => users_controller.ban(req, res));
users_router.route('/allow')
    .post((req: express.Request, res: express.Response) => users_controller.allow(req, res));

export default users_router;
