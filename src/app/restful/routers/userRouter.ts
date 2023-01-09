import { Router } from 'express';
import AuthValidator from '../../system/validators/auth';
import userControllers from '../controllers/userControllers';
import { protectedRoute } from '../middlewares/auth';

const router = Router();

router.get('/', protectedRoute, userControllers.getAll);
router.get('/:id',userControllers.getOne )
router.put('/:id',protectedRoute,AuthValidator.update,userControllers.update )
router.delete('/:id',protectedRoute,userControllers.delete )

export default router;
