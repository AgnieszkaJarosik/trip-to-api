const express = require('express');
const cors = require('cors');
require('dotenv').config();
const placesRoute = require('./routes/placesRoute');
const restaurantsRoute = require('./routes/restaurantsRoute');
const infoRoute = require('./routes/infoRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/places', placesRoute);
app.use('/restaurants', restaurantsRoute);
app.use('/info', infoRoute);

const port = process.env.PORT || 4500;

app.listen(port, ()=> console.log(`server started at ${port}`));