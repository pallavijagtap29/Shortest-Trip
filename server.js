require('babel-register')({
    presets: [ 'es2015' ]
 });

const express = require('express');
global.express = express;
const {config} = require('./config/config');
const routes = require('./routes/routes');

const	app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',routes)

// start app on PORT
app.listen(config.Port, () => console.log(`Started server on ${config.Port}`));
