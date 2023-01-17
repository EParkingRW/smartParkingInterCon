import { Router } from 'express';
import GarageControllers from '../controllers/parkingControllers';
import { protectedRoute } from '../middlewares/auth';

const router = Router();

router.post(
    '/',
    protectedRoute,
    GarageControllers.create,
  );

router.get(
    '/',  
    GarageControllers.getAll);

router.get(
      '/user',
      protectedRoute,
      GarageControllers.getOfUser,
    );

router.get(
  '/user/:id',
  protectedRoute,
  GarageControllers.getParkingOfUser,
);

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
