import sequelize from './config/sequelize';
import UserModel from './models/user.model';
import GarageModel from './models/garage.model';
import CompanyModel from './models/company.model';

const DB = {
  sequelize, // connection instance (RAW queries)
  Users: UserModel(sequelize),
  Garages:GarageModel(sequelize),
  Companies:CompanyModel(sequelize),
};

export default DB;
