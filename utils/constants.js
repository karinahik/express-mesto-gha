// Генерация секретного ключа командой в терминале
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
const securityKey = '6ad0c06c6811350368aa3b3ea80a50ae9e52e5a52171597035ca4a3b7a4d175a';

// Регулярное выражение для проверки ввода url адреса
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// Код успешного ответа. Запрос был обработан успешно.
const OK_STATUS_CODE = 200;

// Код успешного создания. Ресурс был успешно создан.
const CREATED_STATUS_CODE = 201;

// Код некорректного запроса. Запрос содержит ошибку или неправильные данные.
const BAD_REQUEST_STATUS_CODE = 400;

// Код не найден. Запрашиваемый ресурс не был найден на сервере.
const NOT_FOUND_STATUS_CODE = 404;

// Код внутренней ошибки сервера. Возникла ошибка при обработке запроса на стороне сервера.
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;

module.exports = {
  securityKey,
  urlRegex,
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
};
