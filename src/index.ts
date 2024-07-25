import * as dotenv from 'dotenv';
import express from 'express';
import { logger } from './shared/logger';
import zikResourcesRoutes from './zik-resource/infrastructure/in/api';
import { errorMiddleware } from './shared/api-error';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json); // allow JSON parsing

app.use('/zik-resources', zikResourcesRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
