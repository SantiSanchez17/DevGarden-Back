import express from 'express'
import 'dotenv/config'
import router from "./router";
import { conectionDB } from './config/db';
import cors from 'cors'
import { corsConfig } from './config/cors';
conectionDB();
const app = express();

//Cors
app.use(cors(corsConfig))

app.use(express.json())
app.use('/', router);

export default app