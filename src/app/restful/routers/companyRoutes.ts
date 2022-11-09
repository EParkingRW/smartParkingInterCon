import { Router } from 'express';
import CompanyControllers from '../controllers/companyControllers';
import { protectedRoute } from '../middlewares/auth';

const router = Router();

router.post(
    '/',
    CompanyControllers.create,
  );

router.get(
    '/',  
    CompanyControllers.getAll);

router.get(
    '/:id', 
    CompanyControllers.getOne);

router.put(
    '/:id', 
    protectedRoute, 
    CompanyControllers.update);
router.delete(
  '/:id',
  CompanyControllers.delete,
);
export default router;
