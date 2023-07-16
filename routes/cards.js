const router = require('express').Router();

// пакет, предназначенный для обработки валидации данных в
// Express.js. Он предоставляет удобный способ определения
// и применения правил валидации для запросов в вашем приложении Express.
const { celebrate, Joi } = require('celebrate');

const { urlRegex } = require('../utils/constants');

const {
  getInitialCards,
  addNewCard,
  removeCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

// Маршрут для получения всех карточек
router.get('/', getInitialCards);

// Маршрут для создания новой карточки
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlRegex),
    }),
  }),
  addNewCard,
);

// Маршрут для удаления карточки
router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  removeCard,
);

// Маршрут для добавления лайка на карточку
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  addLike,
);

// Маршрут для удаления лайка с карточки
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  removeLike,
);

module.exports = router;
