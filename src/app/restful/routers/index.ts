import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../../docs';

const API_VERSION = process.env.API_VERSION || 'v1';
const url = `/api/${API_VERSION}`;
const router = Router();

router.use(`${url}/`, (req, res) => {
    res.send('Default API endpoint');
});

router.use(
  `/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerOptions),
);
router.use('*', (req, res) => {
  res.send('This endpoint is not exist');
});

export default router;
