// Класс ошибки PermissionDeniedError  (Ошибка доступа запрещена)
module.exports = class PermissionDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
