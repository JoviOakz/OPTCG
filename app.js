const express = require('express');
const bodyParser = require('express').json;
const authRoutes = require('./routes/auth');
const collectiblesRoutes = require('./routes/collectibles');

const app = express();
app.use(bodyParser());

// rotas
app.use('/api/auth', authRoutes);
app.use('/api/colecionaveis', collectiblesRoutes);

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
