import * as dotenv from 'dotenv';
import express from 'express';
import { logger } from './util/logger';
import zikResourcesRoutes from './zik-resource/api';
import { errorMiddleware } from './util/api-error';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json); // allow JSON parsing

app.use('/zik-resources', zikResourcesRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
