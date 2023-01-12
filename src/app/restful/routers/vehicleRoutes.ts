import { Router } from 'express';
import vehicleControllers from '../controllers/vehicleControllers';
import { protectedRoute } from '../middlewares/auth';


const router = Router();

router.post(
    '/',
    vehicleControllers.savePlateText,
  );

router.get(
    '/',  
    vehicleControllers.getAllSaveVehicles);

router.delete(
    '/:id',
    protectedRoute, 
    vehicleControllers.delete
    );
router.post(
    '/range',
    protectedRoute,
    vehicleControllers.getVehiclesByDateRange)


export default router;
