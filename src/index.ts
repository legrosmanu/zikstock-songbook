import 'dotenv/config';
import express from 'express';
import { logger } from './shared/logger';
import zikResourcesRoutes from './zikresources/infrastructure/api';
import { errorMiddleware } from './shared/api-error';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // allow JSON parsing

app.use('/zikresources', zikResourcesRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
