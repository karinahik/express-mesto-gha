// Класс ошибки ConflictError  (Ошибка дублирования данных)
module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
