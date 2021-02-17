const express = require('express');
const morgan = require('morgan');

const { mongoose } = require('./database');
const path = require('path');
const app = express();


//setting
app.set('port', process.env.PORT || 3000);
//moiddlewares
app.use(morgan('dev'));
app.use(express.json());
// routes
app.use('/api/tasks',require('./routes/task.routes.js'));
// static files
app.use(express.static(
    path.join(__dirname, 'public')
));
//starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});