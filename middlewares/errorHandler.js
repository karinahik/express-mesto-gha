// Middleware для обработки ошибок
const errorHandler = (err, _, res, next) => {
  // Определяем статус код ошибки,
  // либо устанавливаем значение по умолчанию 500
  const statusCode = err.statusCode || 500;

  // Определяем сообщение об ошибке в зависимости от статус кода
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  // Отправляем ответ с указанным статус кодом
  res.status(statusCode).send({ message });
  // и сообщением об ошибке
  next(); // Передаем управление следующему middleware или обработчику маршрута
};

module.exports = errorHandler;
