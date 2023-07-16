// Класс ошибки AuthenticationError (Ошибка аутентификации)
module.exports = class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
