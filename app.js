require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

mongoose
  .connect('mongodb://localhost/create-read-example', { useNewUrlParser: true })
  .then(x => {
    // console.log('x', x.connections[0].collections.tasks.name);
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);
// console.log("require('debug): ", require('debug')); //[Function: createDebug]{...}
// console.log('app_name: ', app_name); //create-read-example
// console.log('path.basename: ', path.basename(__filename).split('.')[0]); //app
// console.log('debag: ', debug);
//debag ->: [Function: debug] {
//   namespace: 'create-read-example:app',
//   enabled: true,
//   useColors: true,
//   color: 2,
//   inspectOpts: {}
// }

const app = express();
// console.log('Output for: app', app);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//not to use ==>
// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));

// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';
// console.log(' pp.locals: ', app.locals);

const index = require('./routes/index');
app.use('/', index);
app.use('/', require('./routes/create-read/form-page'));

module.exports = app;
