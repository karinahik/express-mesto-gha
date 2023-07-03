// Подключение модуля маршрутизации Express
const router = require('express').Router();

const { NOT_FOUND_STATUS_CODE } = require('../utils/errors');

// Подключение маршрутов для карточек
const cardRoutes = require('./cards');
// Подключение маршрутов для пользователей
const userRoutes = require('./users');

// Использование маршрутов для карточек по пути "/cards"
router.use('/cards', cardRoutes);
// Использование маршрутов для пользователей по пути "/users"
router.use('/users', userRoutes);

// Обработка запросов на несуществующие маршруты
router.use('/*', (req, res) => {
  res
    .status(NOT_FOUND_STATUS_CODE)
    .send({ message: `${NOT_FOUND_STATUS_CODE}: Страница не найдена.` });
});

// Экспорт модуля маршрутизации
module.exports = router;
