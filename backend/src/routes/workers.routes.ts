import * as express from 'express';
import WorkersController from '@controllers/workers/workers.controller';


const workers_router = express.Router();
const workers_controller = new WorkersController();

workers_router.route('/insert')
    .post((req: express.Request, res: express.Response) => workers_controller.insert(req, res));
workers_router.route('/edit')
    .post((req: express.Request, res: express.Response) => workers_controller.edit(req, res));
workers_router.route('/erase')
    .post((req: express.Request, res: express.Response) => workers_controller.erase(req, res));
workers_router.route('/get_all')
    .get((req: express.Request, res: express.Response) => workers_controller.get_all(req, res));
workers_router.route('/get')
    .get((req: express.Request, res: express.Response) => workers_controller.get(req, res));
workers_router.route('/more_workers')
    .post((req: express.Request, res: express.Response) => workers_controller.more_workers(req, res));

    
export default workers_router;