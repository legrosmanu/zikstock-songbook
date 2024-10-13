import 'dotenv/config';
import { Firestore } from '@google-cloud/firestore';

const db = new Firestore({
    projectId: process.env.GCP_PROJECT_ID,
    host: process.env.DB_HOST,
    port: (process.env.DB_PORT) ? +process.env.DB_PORT : undefined 
});

export {
    db
};