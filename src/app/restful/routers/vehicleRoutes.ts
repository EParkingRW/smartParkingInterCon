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

router.get(
    '/parkings/:id',
    protectedRoute,
    vehicleControllers.vehiclesOfInParking)

router.get(
    '/inside/:id',
    protectedRoute,
    vehicleControllers.getVehicleInsideParking)


export default router;
