import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import createHttpError from 'http-errors';

//абсолютний шлях до json документа
const oauthConfigPath = path.resolve('googleOauth.json');

// читаємо json документ
const oauthConfig = JSON.parse(await readFile(oauthConfigPath, 'utf-8'));

const redirectUri = oauthConfig.web.redirect_uris[0];

const clientId = env('GOOGLE_AUTH_CLIENT_ID');
const clientSecret = env('GOOGLE_AUTH_CLIENT_SECRET');

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri,
});

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) {
    throw createHttpError(401);
  }
  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

export const generateGoogleOauthUrl = () => {
  const url = googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

  return url;
};
