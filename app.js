// Подключение необходимых модулей и файлов
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');
const auth = require('./middlewares/auth');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const NotFoundPageError = require('./errors/NotFoundPageError');
const errorHandler = require('./middlewares/errorHandler');

// Сохранение адреса базы данных в константу, для подключения к монго
const URL = 'mongodb://127.0.0.1:27017/mestodb';

// Определение порта из переменной окружения или использование значения по умолчанию
const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

// Подключение к базе данных MongoDB
mongoose
  .connect(URL)
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удается подключиться к БД, проверьте правильность подключения');
  });

// Создание экземпляра приложения Express
const app = express();

// Применение промежуточного ПО для обеспечения безопасности
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => next(new NotFoundPageError('Запрашиваемый ресурс не найден.')));
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
