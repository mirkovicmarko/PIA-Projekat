import { Request, Response } from 'express';

import { CONSTRUCTION_STATUSES, JOB_STATUSES, SESSION_DATA } from '@consts';
import ObjectModel from '@models/Object';
import { InferSchemaType } from 'mongoose';
import Object from '@models/Object';
import UserModel from '@models/User';
import WorkerModel from '@models/User/Agency/Worker';


type Object = InferSchemaType<typeof Object.schema>;
type Worker = InferSchemaType<typeof WorkerModel.schema>;
type User = InferSchemaType<typeof UserModel.schema>;

export default async function update_object_status(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const object_id = req.body['object_id'];
    const rooms_ids = req.body['rooms_ids'];

    if(!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(!object_id || !rooms_ids) {
        res.statusCode = 400;
        res.send('Unesite sve podatke.');
        return;
    }

    const object = await ObjectModel.findOne({ _id: object_id }).then(
        (object) => {
            if(!object) {
                res.statusCode = 400;
                res.send(['Objekat ne postoji.']);
                return;
            }
            return object;
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
            return;
        }
    );

    if(!object) {
        return;
    }

    if(object.status !== CONSTRUCTION_STATUSES.undergoing) {
        res.statusCode = 400;
        res.send(['Objekat nije u izradi.']);
        return;
    }

    const workers: Worker[] = await UserModel.findOne({ _id: user_id }).then(
        (user: User) => {
            return user.agency.workers;
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
            return null;
        }
    );

    if(!workers) {
        return false;
    }

    for(let room_id of rooms_ids) {
        const room = object.rooms.find((room) => room._id.equals(room_id));

        room.reconstruction_status = CONSTRUCTION_STATUSES.done;

        for(let worker_id of room.allocated_workers) {
            const worker = workers.find((worker) => worker._id.equals(worker_id));
            worker.allocated = false;
        }
        
        room.allocated_workers = [];
    }

    try {
        await UserModel.findOneAndUpdate(
            { _id: user_id },
            { 'agency.workers': workers }
        );
    } catch(error) {
        res.statusCode = 500;
        res.send(['Greška na serveru.']);
        return;
    }

    let done: boolean = true;
    for(let room of object.rooms) {
        if(room.reconstruction_status !== CONSTRUCTION_STATUSES.done) {
            done = false;
            break;
        }
    }

    if(done) {
        object.status = CONSTRUCTION_STATUSES.done;

        const job = object.jobs.find((job) => job.status === JOB_STATUSES.undergoing);
        job.status = JOB_STATUSES.finished;
    }

    object.save().then(
        () => {
            res.send();
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
