import './load-env.js';
import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
import apicache from 'apicache';

const PORT = process.env.PORT || 5500;

const app = express();
const cache = apicache.middleware;

const corsOption = {
  origin: 'https://zekumoru.github.io/',
  optionsSuccessStatus: 200,
};

app.use(cache('2 hours'));
app.use(cors(corsOption));
app.use('/game-store-api', router);

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
