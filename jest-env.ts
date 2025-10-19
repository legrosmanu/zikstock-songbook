import 'dotenv/config';

process.env.NODE_ENV="test"
process.env.FIRESTORE_EMULATOR_HOST="[::1]:8483";
process.env.GCP_PROJECT_ID=process.env.SECRET_PROJECT_ID;