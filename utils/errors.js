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
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
};
