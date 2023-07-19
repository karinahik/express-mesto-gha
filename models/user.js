const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AuthenticationError = require('../errors/AuthenticationError');

const { Schema } = mongoose;
const { urlRegex } = require('../utils/constants');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Введите электронный адрес',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6, // Минимальная длина пароля должна быть 6 символов.
    },

    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2, // Минимальная длина имени пользователя должна быть 2 символа.
      maxlength: 30, // Максимальная длина имени пользователя должна быть 30 символов.
    },

    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2, // Минимальная длина информации о пользователе должна быть 2 символа.
      maxlength: 30, // Максимальная длина информации о пользователе должна быть 30 символов.
    },

    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => urlRegex.test(url),
        message: 'Введите URL',
      },
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password).then((matched) => {
                if (matched) return user;
                throw new AuthenticationError('Неправильные почта или пароль');
              });
            }
            throw new AuthenticationError('Неправильные почта или пароль');
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
