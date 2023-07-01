import * as express from 'express';
import JobsController from '@controllers/jobs/jobs.controller';


const jobs_router = express.Router();
const jobs_controller = new JobsController();

jobs_router.route('/get_all')
    .get((req: express.Request, res: express.Response) => jobs_controller.get_all(req, res));

export default jobs_router;