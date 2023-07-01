import cors from 'cors';
import bodyPaser from 'body-parser';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';

import { ORIGIN_URL } from '@consts';
import users_router from '@routes/users.routes';
import agencies_router from '@routes/agencies.routes';
import objects_router from '@routes/objects.routes';
import workers_router from '@routes/workers.routes';
import jobs_router from '@routes/jobs.routes';

const app = express();

app.use(bodyPaser.json({ limit: '10mb' }));
app.use(cors({ credentials: true, origin: ORIGIN_URL }));

app.use(session({
  secret: 'strongsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'strict'
  }
}))

const router = express.Router();
router.use('/users', users_router);
router.use('/agencies', agencies_router);
router.use('/objects', objects_router);
router.use('/workers', workers_router);
router.use('/jobs', jobs_router);
app.use("/", router);

mongoose.connect('mongodb://127.0.0.1:27017/PIAProject');

app.listen(4000, () => console.log(`Express server running on port 4000`));
