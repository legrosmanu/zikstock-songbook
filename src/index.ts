import * as dotenv from 'dotenv';
import express from 'express';
import { logger } from './util/logger';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json); // allow JSON parsing

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
