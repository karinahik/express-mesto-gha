const router = require('express').Router();

// пакет, предназначенный для обработки валидации данных в
// Express.js. Он предоставляет удобный способ определения
// и применения правил валидации для запросов в вашем приложении Express.
const { celebrate, Joi } = require('celebrate');

const { urlRegex } = require('../utils/constants');

const {
  getUsersInfo,
  getUserInfoId,
  getUserInfo,
  editProfileUserInfo,
  updateProfileUserAvatar,
} = require('../controllers/users');

// Пользователи:
router.get('/', getUsersInfo);

// Пользователь
router.get('/me', getUserInfo);

// Конкретный пользователь по его ID:
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserInfoId,
);

// Редактирование данных пользователя:
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  editProfileUserInfo,
);

// Редактирование аватара пользователя:
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlRegex),
    }),
  }),
  updateProfileUserAvatar,
);

module.exports = router;
