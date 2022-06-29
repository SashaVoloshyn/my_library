import express from 'express';

import { apiRouter } from './routes/api.router';
import { AppDataSource } from './configs/ormconfig';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.listen(5555, async () => {
    console.log('Server is running on PORT:5555!');
    try {
        const connection = await AppDataSource.initialize();
        if (connection) {
            console.log('Data Base has been connected!');
        }
    } catch (e) {
        console.error('Error connection to Data Base', e);
    }
});
