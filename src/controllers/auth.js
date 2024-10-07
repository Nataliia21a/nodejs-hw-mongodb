import {
  signUp,
  signIn,
  refreshSession,
  signout,
  requestResetToken,
  resetPassword,
  loginOrRegisterWithGoogleOauth,
} from '../services/auth.js';

import { generateGoogleOauthUrl } from '../utils/googleOAuth2.js';

const setUpSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });
};

export const signUpController = async (req, res) => {
  const newUser = await signUp(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
};

export const signInController = async (req, res) => {
  const session = await signIn(req.body);

  setUpSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await refreshSession({ refreshToken, sessionId });

  setUpSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refresh session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const signoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await signout(sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
};

export const resetPasswordControllers = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const googleOauthUrlController = async (req, res) => {
  const url = generateGoogleOauthUrl();

  res.json({
    status: 200,
    message: 'Successefully create Google Oauth url',
    data: {
      url,
    },
  });
};

export const userLoginWithGoogleOauthController = async (req, res) => {
  const session = await loginOrRegisterWithGoogleOauth(req.body.code);

  setUpSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully login with Google Oauth',
    data: {
      accessToken: session.accessToken,
    },
  });
};
