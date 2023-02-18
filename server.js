import './load-env.js';
import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
import apicache from 'apicache';

const PORT = process.env.PORT || 5500;

const app = express();
const cache = apicache.middleware;

app.use(cache('2 hours'));
app.use(cors());
app.use('/game-store-api', router);

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
