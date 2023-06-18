import cors from 'cors';
import bodyPaser from 'body-parser';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import users_router from '@routes/users.routes';

const app = express();

app.use(bodyPaser.json({ limit: '10mb' }));
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

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
app.use("/", router);

mongoose.connect('mongodb://127.0.0.1:27017/PIAProject');

app.listen(4000, () => console.log(`Express server running on port 4000`));
