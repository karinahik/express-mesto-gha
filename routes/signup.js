const router = require('express').Router();

// пакет, предназначенный для обработки валидации данных в
// Express.js. Он предоставляет удобный способ определения
// и применения правил валидации для запросов в вашем приложении Express.
const { celebrate, Joi } = require('celebrate');

const { registrationUser } = require('../controllers/users');

const { urlRegex } = require('../utils/constants');

// Маршрут для регистрации нового пользователя
router.post(
  '/signup',
  celebrate({
    // Проверка входящих данных с использованием celebrate и Joi
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlRegex),
    }),
  }),
  registrationUser,
);

module.exports = router;
