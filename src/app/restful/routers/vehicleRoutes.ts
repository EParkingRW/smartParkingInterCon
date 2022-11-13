import { Router } from 'express';
import vehicleControllers from '../controllers/vehicleControllers';
import { protectedRoute } from '../middlewares/Auth';


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
    // protectedRoute, 
    vehicleControllers.delete
    );

export default router;
