import * as express from 'express';
import JobsController from '@controllers/jobs/jobs.controller';


const jobs_router = express.Router();
const jobs_controller = new JobsController();

jobs_router.route('/get_all')
    .get((req: express.Request, res: express.Response) => jobs_controller.get_all(req, res));
jobs_router.route('/get')
    .get((req: express.Request, res: express.Response) => jobs_controller.get_all(req, res));
jobs_router.route('/request')
    .post((req: express.Request, res: express.Response) => jobs_controller.request(req, res));
jobs_router.route('/offer')
    .post((req: express.Request, res: express.Response) => jobs_controller.offer(req, res));
jobs_router.route('/decline_request')
    .post((req: express.Request, res: express.Response) => jobs_controller.decline_request(req, res));
jobs_router.route('/accept_offer')
    .post((req: express.Request, res: express.Response) => jobs_controller.accept_offer(req, res));
jobs_router.route('/decline_offer')
    .post((req: express.Request, res: express.Response) => jobs_controller.decline_offer(req, res));
jobs_router.route('/allocate_workers')
    .post((req: express.Request, res: express.Response) => jobs_controller.allocate_workers(req, res));
jobs_router.route('/update_object_status')
    .post((req: express.Request, res: express.Response) => jobs_controller.update_object_status(req, res));
jobs_router.route('/pay')
    .post((req: express.Request, res: express.Response) => jobs_controller.pay(req, res));
jobs_router.route('/cancellation_request')
    .post((req: express.Request, res: express.Response) => jobs_controller.cancellation_request(req, res));

export default jobs_router;