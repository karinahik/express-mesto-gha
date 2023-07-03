// Подключение необходимых модулей и файлов
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const routes = require("./routes/router");

// Определение порта из переменной окружения или использование значения по умолчанию
const { PORT = 3000 } = process.env;

// Создание экземпляра приложения Express
const app = express();

// Применение промежуточного ПО для обеспечения безопасности
app.use(helmet());

// Отключение заголовка "x-powered-by"
app.disable("x-powered-by");

// Парсинг JSON-запросов
app.use(express.json());

// Установка значения для свойства "user" в объекте "req"
app.use((req, res, next) => {
  req.user = {
    _id: "64a2d9ae07df4352e5bfc82a" /* {
     "name": "Karina",
    "about": "Developer",
    "avatar": "https://s00.yaplakal.com/pics/pics_original/5/0/6/17827605.jpg",
    "_id": "64a2d9ae07df4352e5bfc82a"
  } Данные пользователя созданы через POSTMAN успешно присвоен уникальный id пользователя */,
  };
  console.log(req.user);
  next();
});

// Подключение маршрутов
app.use(routes);

// Подключение к базе данных MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb")
  .then(() => {
    console.log("БД подключена");
  })
  .catch(() => {
    console.log(
      "Не удается подключиться к БД, проверьте правильность подключения"
    );
  });
console.log(PORT);

// Запуск сервера на указанном порту
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
