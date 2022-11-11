import { Model, DataTypes, Sequelize } from 'sequelize';

export class Company extends Model {}

const CompanyModel = (sequelize: Sequelize) => {
  Company.init(
    {
      id: {
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 
      },
      name: DataTypes.STRING,
    },
    {
      tableName: 'tbl_companies',
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    },
  );
  return Company;
};

export default CompanyModel;
