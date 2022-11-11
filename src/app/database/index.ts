import sequelize from './config/sequelize';
import UserModel from './models/user.model';
import GarageModel from './models/garage.model';
import CompanyModel from './models/company.model';
import VehicleModel from './models/vehile.model';

const DB = {
  sequelize, // connection instance (RAW queries)
  Users: UserModel(sequelize),
  Garages:GarageModel(sequelize),
  Companies:CompanyModel(sequelize),
  Vehicles:VehicleModel(sequelize),
};

export default DB;
