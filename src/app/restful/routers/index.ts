import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../../docs';
import UserRoutes from './userRouter';
import GarageRoutes from './garageRoutes';
import CompanyRoutes from './companyRoutes';

const API_VERSION = process.env.API_VERSION || 'v1';
const url = `/api/${API_VERSION}`;
const router = Router();

router.use(
  `/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerOptions),
);


router.use(`${url}/auth`, UserRoutes);
router.use(`${url}/garages`, GarageRoutes);
router.use(`${url}/companies`, CompanyRoutes);

router.use(`${url}/`, (req, res) => {
  res.send({status:200,message:'Default API endpoint'});
});

router.use('*', (req, res) => {
  res.send({status:404,message:'This endpoint is not exist'});
});

export default router;
