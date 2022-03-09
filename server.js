const express = require('express');
const colors = require('colors');
const app = express();
var dotenv = require('dotenv');
var errorHandler = require('./middleware/error')

const users = require('./app/User')
const jobs = require('./app/Job')

dotenv.config({ path: './config/config.env' });
const connectdb = require('./config/db');

connectdb();

app.get('/', (req, res) => res.send('Hello Worldx!'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//require('./app/Routes')(app,console);
app.use('/api/v1/users', users);
app.use('/api/v1/jobs', jobs);

app.use(errorHandler);

PORT = process.env.PORT || 5000;
console.log(PORT)

var server = app.listen(PORT, () => {
        console.log(`server running at the port :${PORT}`.cyan.underline.bold);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Unhandled Rejection at: Promise, ${promise}, 'reason:', ${err.message}`)
    // application specific logging, throwing an error, or other logic here
    server.close(() => {process.exit(1)})
}); 
