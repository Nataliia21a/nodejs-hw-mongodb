import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  userSignUpSchema,
  userSignInSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/users.js';
import {
  signUpController,
  signInController,
  refreshController,
  signoutController,
  requestResetEmailController,
  resetPasswordControllers,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignUpSchema),
  ctrlWrapper(signUpController),
);

authRouter.post(
  '/login',
  validateBody(userSignInSchema),
  ctrlWrapper(signInController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(signoutController));

authRouter.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordControllers),
);

export default authRouter;
