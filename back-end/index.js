require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = express.Router();

userRouter
  .post(
    '/',
    middlewares.fieldsValidator(['name', 'email', 'password', 'role']),
    controllers.user.register,
  )
  .post(
    '/login',
    middlewares.fieldsValidator(['email', 'password']),
    controllers.user.login,
  )
  .get(
    '/info',
    middlewares.authentication,
    controllers.user.getInfo,
  )
  .put(
    '/:id',
    middlewares.authentication,
    controllers.user.edit,
  );

app.use('/users', userRouter);

const productRouter = express.Router();

productRouter
  .get(
    '/',
    middlewares.authentication,
    controllers.product.getAll,
  );

app.use('/products', productRouter);

app.use(middlewares.boomErrorHandler);
app.use(middlewares.otherErrorsHandler);

app.listen(3001, () => console.log('Listening on 3001'));
