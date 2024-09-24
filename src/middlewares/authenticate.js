import createHttpError from 'http-errors';
import { findSessionByAccessToken, findUser } from '../services/auth.js';

const authenticate = async (req, res, next) => {
  //записуємо заголовок авторизації
  const { authorization } = req.headers;
  // const authorization = req.get('Authorization');

  //якщо немає заголовку авторизації - виводимо помилку
  if (!authorization) {
    return next(createHttpError(401, 'Authorization header not found'));
  }
  // якщо заголовок авторизації є - розділяємо його на частини
  const [bearer, token] = authorization.split(' ');

  //якщо перша частина заголовку авторизації не Bearer -значить є помилка
  if (bearer !== 'Bearer') {
    return next(
      createHttpError(401, 'Authorization header must have Bearer type'),
    );
  }
  // перевіряємо чи є сесія з токеном
  const session = await findSessionByAccessToken(token);

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  //перевірка чи час сесії не закінчився
  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }
  // перевірка чи є ще користувач, для якого була створена сесія
  const user = await findUser({ _id: session.userId });

  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;

  next();
};

export default authenticate;
