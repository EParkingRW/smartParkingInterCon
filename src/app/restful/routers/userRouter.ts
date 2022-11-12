import { Router } from 'express';
import AuthValidator from '../../system/validators/auth';
import AuthControllers from '../controllers/userControllers';
import { protectedRoute } from '../middlewares/Auth';

const router = Router();

router.post(
    '/',
    AuthValidator.register,
    AuthControllers.register,
  );

router.post('/signin', AuthValidator.login, AuthControllers.signIn);

router.post('/confirm', AuthControllers.confirmAccount);

router.get('/profile', protectedRoute, AuthControllers.getProfile);
router.post(
  '/forget-password',
  AuthValidator.forgetPassword,
  AuthControllers.forgettingPassword,
);
router.put(
  '/reset-password',
  AuthValidator.resetPassword,
  AuthControllers.resetingPassword,
);

router.patch('/logout', protectedRoute, AuthControllers.logOut);

export default router;
