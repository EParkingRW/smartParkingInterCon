import sequelize from './config/sequelize';
import UserModel from './models/user.model';
import GarageModel from './models/garage.model';

const DB = {
  sequelize, // connection instance (RAW queries)
  Users: UserModel(sequelize),
  Garages:GarageModel(sequelize),
};

export default DB;
