require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routers/index');
const connectDB = require('./configDB');
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT: ${PORT}`);
})

connectDB();