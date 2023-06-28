import * as express from 'express';
import ObjectsController from '@controllers/objects/objects.controller';


const objects_router = express.Router();
const objects_controller = new ObjectsController();

objects_router.route('/make')
    .post((req: express.Request, res: express.Response) => objects_controller.make(req, res));
objects_router.route('/get_all')
    .get((req: express.Request, res: express.Response) => objects_controller.get_all(req, res));


export default objects_router;