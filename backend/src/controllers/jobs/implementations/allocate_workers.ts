import { Request, Response } from 'express';

import ObjectModel from '@models/Object';
import UserModel from '@models/User';
import WorkerModel from '@models/User/Agency/Worker';
import { CONSTRUCTION_STATUSES, JOB_STATUSES, SESSION_DATA } from '@consts';
import agency_aggregation from './get/agency_aggregation';
import { InferSchemaType } from 'mongoose';
import Room from '@models/Object/Room';


type ObjectRoom = InferSchemaType<typeof Room.schema>;
type User = InferSchemaType<typeof UserModel.schema>;
type Worker = InferSchemaType<typeof WorkerModel.schema>;

export default async function allocate_workers(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const job_id = req.body['job_id'];
    const workers_allocation_string = req.body['workers_allocation'];

    if(!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(!job_id || !workers_allocation_string) {
        res.statusCode = 400;
        res.send('Unesite sve podatke.');
        return;
    }

    const workers_allocation = JSON.parse(workers_allocation_string);

    const get_job_pipeline = agency_aggregation(user_id, job_id);

    const job = await ObjectModel.aggregate(get_job_pipeline).then(
        (result) => {
            if(result.length === 0) {
                res.statusCode = 400;
                res.send('Posao ne postoji.');
                return null;
            }
            return result[0];
        },
        (error) => {
            console.log(error);

            res.statusCode = 500;
            res.send(['Greška na serveru.']);
            return null;
        }
    );

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

    if(job === null || workers === null) {
        return;
    }

    const rooms: ObjectRoom[] = job['object']['rooms'];

    for(let room of rooms) {
        const allocated_workers = workers_allocation[room._id.toString()];

        if(allocated_workers === undefined || allocated_workers.length === 0) {
            res.statusCode = 400;
            res.send('Svakoj prostoriji se moraju dodeliti radnici.');
            return;
        }

        room.allocated_workers = workers_allocation[room._id.toString()];

        for(let allocated_worker_id of room.allocated_workers) {
            const worker: Worker = workers.find((worker: Worker) => worker._id.equals(allocated_worker_id));

            if(worker === undefined) {
                res.statusCode = 400;
                res.send(['Radnik ne postoji.']);
                return;
            }

            if(worker.allocated) {
                res.statusCode = 400;
                res.send(['Radnik je zauzet drugim poslom.']);
                return;
            }

            worker.allocated = true;
        }

        room.reconstruction_status = CONSTRUCTION_STATUSES.undergoing;
    }

    try {
        await ObjectModel.findOneAndUpdate(
            { 'jobs._id': job_id, 'jobs.agency_id': user_id },
            {
                'jobs.$[elem].status': JOB_STATUSES.undergoing,
                status: CONSTRUCTION_STATUSES.undergoing,
                'rooms': rooms
            },
            { 
                arrayFilters: [
                    { 'elem._id': job_id }
                ]
            }
        );

        await UserModel.findOneAndUpdate(
            { _id: user_id },
            { 'agency.workers': workers }
        );
    } catch(error) {
        console.log(error);

        res.statusCode = 500;
        res.send(['Greška na serveru.']);

        return;
    }

    res.send();
};
