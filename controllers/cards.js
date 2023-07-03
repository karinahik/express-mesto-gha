const { OK_STATUS_CODE } = require('../utils/errors');
const { CREATED_STATUS_CODE } = require('../utils/errors');
const { BAD_REQUEST_STATUS_CODE } = require('../utils/errors');
const { NOT_FOUND_STATUS_CODE } = require('../utils/errors');
const { INTERNAL_SERVER_ERROR_STATUS_CODE } = require('../utils/errors');

const Card = require('../models/card');

// Вывод массива карточек а страницу
module.exports.getInitialCards = (req, res) => {
  Card.find({})
    // обработка успешного выполнения запроса.
    // Когда карточки успешно найдены,
    .then((cards) => res.status(OK_STATUS_CODE).send(cards))
    // обработка ошибки при выполнении запроса.
    // Если произошла ошибка при поиске карточек, отправляется ответ
    .catch(() => res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
      message: 'На сервере произошла ошибка',
    }));
};

// Добавление новой карточки на страницу
module.exports.addNewCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({
          message:
            'Передача некорректных данных при попытке добавления новой карточки на страницу.',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};

// Удаление карточки из массива
module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: 'Карточка c передаваемым ID не найдена' });
      }
      return res.status(OK_STATUS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({
          message: 'Передача некорректных данных карточки.',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};

// Постановка лайка на карточку
module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(OK_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: 'Карточка c передаваемым ID не найдена' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_STATUS_CODE).send({
          message: 'Передача некорректных данных при попытке поставить лайк.',
        });
      }
      return res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

// Удаление лайка с карточки
module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(OK_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: 'Карточка c передаваемым ID не найдена' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_STATUS_CODE).send({
          message:
            'Передача некорректных данных при попытке удаления лайка с карточки.',
        });
      }
      return res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};
