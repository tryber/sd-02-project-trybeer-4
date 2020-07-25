require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.post(
  '/login',
  middlewares.fieldsValidator(['email', 'password']),
  controllers.user.login,
);

app.post(
  '/users',
  middlewares.fieldsValidator(['name', 'email', 'password', 'role']),
  controllers.user.register,
);

app.use(middlewares.boomErrorHandler);
app.use(middlewares.otherErrorsHandler);

app.listen(3001, () => console.log('Listening on 3001'));
