import express from 'express';
import { json as bodyParser } from 'express';
import authRoutes from './src/routes/auth.js';
import collectiblesRoutes from './src/routes/collectibles.js';

const app = express();
app.use(bodyParser());

app.use('/api/auth', authRoutes);
app.use('/api/colecionaveis', collectiblesRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

export default app;
