import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userSignUpSchema, userSignInSchema } from '../validation/users.js';
import {
  signUpController,
  signInController,
  refreshController,
  signoutController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userSignUpSchema),
  ctrlWrapper(signUpController),
);

authRouter.post(
  '/signin',
  validateBody(userSignInSchema),
  ctrlWrapper(signInController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/signout', ctrlWrapper(signoutController));

export default authRouter;
