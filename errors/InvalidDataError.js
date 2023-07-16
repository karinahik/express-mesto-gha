// Класс ошибки InvalidDataError (Ошибка неверных данных)
module.exports = class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
