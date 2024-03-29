import dotenv from 'dotenv';
import swaggerDoc from './swagger.json';
import auth from './auth/auth';
import parking from './parking';
import company from './company/company';
import Vehicles from './vehicles';
import user from './user';


const defaults = swaggerDoc.paths;

dotenv.config();

const host =
  process.env.NODE_ENV === 'production'
    ? process.env.HOST.split('https://')[1]
    : process.env.HOST.split('http://')[1];

const paths = {
  ...defaults,
  ...auth,
  ...user,
  ...company,
  ...parking,
  ...Vehicles,
};

const config = {
  swagger: '2.0',
  info: {
    version: '1.0.0.',
    title: 'Smart parkings APIs Documentation',
    description: '',
  },
  host,
  basePath: `/api/${process.env.API_VERSION || 'v1'}`,
  schemes: ['http', 'https'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  tags: [
    {
      name: 'Smart parkings APIs Documentation',
    },
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths,
};
export default config;
