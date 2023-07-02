import * as express from 'express';
import JobsController from '@controllers/jobs/jobs.controller';


const jobs_router = express.Router();
const jobs_controller = new JobsController();

jobs_router.route('/get_all')
    .get((req: express.Request, res: express.Response) => jobs_controller.get_all(req, res));
jobs_router.route('/accept')
    .post((req: express.Request, res: express.Response) => jobs_controller.accept(req, res));
jobs_router.route('/decline')
    .post((req: express.Request, res: express.Response) => jobs_controller.decline(req, res));

export default jobs_router;