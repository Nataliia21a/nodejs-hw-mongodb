import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userSingUpSchema, userSingInSchema } from '../validation/users.js';
import { singUpController, singInController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/singup',
  validateBody(userSingUpSchema),
  ctrlWrapper(singUpController),
);

authRouter.post(
  '/singin',
  validateBody(userSingInSchema),
  ctrlWrapper(singInController),
);

export default authRouter;
