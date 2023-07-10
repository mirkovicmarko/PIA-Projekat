import * as express from 'express';
import AgenciesController from '@controllers/agencies/agencies.controller';


const agencies_router = express.Router();
const agencies_controller = new AgenciesController();

agencies_router.route('/get_all')
    .get((req: express.Request, res: express.Response) => agencies_controller.get_all(req, res));
agencies_router.route('/get')
    .get((req: express.Request, res: express.Response) => agencies_controller.get(req, res));
agencies_router.route('/rate')
    .post((req: express.Request, res: express.Response) => agencies_controller.rate(req, res));
agencies_router.route('/delete_rating')
    .post((req: express.Request, res: express.Response) => agencies_controller.delete_rating(req, res));

export default agencies_router;