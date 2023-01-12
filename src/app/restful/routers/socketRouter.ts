import { Router } from 'express';
import vehicleControllers from '../controllers/vehicleControllers';
import { protectedRoute } from '../middlewares/auth';


const router = Router();

router.get(
    '/:id',
    protectedRoute, 
    vehicleControllers.leavingSocketRoom
    );


export default router;
