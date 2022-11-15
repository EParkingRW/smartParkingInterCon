import { Router } from 'express';
import GarageControllers from '../controllers/garageControllers';
import { protectedRoute } from '../middlewares/auth';

const router = Router();

router.post(
    '/',
    GarageControllers.create,
  );

router.get(
    '/',  
    GarageControllers.getAll);

router.get(
    '/:id', 
    GarageControllers.getOne);

router.put(
    '/:id', 
    protectedRoute, 
    GarageControllers.update);

router.delete(
  '/:id',
  protectedRoute, 
  GarageControllers.delete,
);

export default router;
