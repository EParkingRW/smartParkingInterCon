import { Model, DataTypes, Sequelize } from 'sequelize';

export class Vehicle extends Model {}

const VehicleModel = (sequelize: Sequelize) => {
  Vehicle.init(
    {
      id: {
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 
      },
      plateText: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      garageId: DataTypes.UUID,
      isInside:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
      }
    },
    {
      tableName: 'tbl_vehicles',
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    },
  );
  return Vehicle;
};

export default VehicleModel;
