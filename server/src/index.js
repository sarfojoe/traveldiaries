const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const InitMongoose = require('../InitMongoose');
require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();
InitMongoose(mongoose);

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

//api routes
app.use('/api/logs', logs);
app.use(require('./api/userRoutes'));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
