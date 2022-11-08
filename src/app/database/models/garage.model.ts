import { Model, DataTypes, Sequelize } from 'sequelize';

export class Garage extends Model {}

const GarageModel = (sequelize: Sequelize) => {
  Garage.init(
    {
      id: {
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      imageUrl: DataTypes.STRING,
      companyId: DataTypes.BIGINT,
      hourlyFee:DataTypes.DOUBLE,
      openingTime:DataTypes.TIME,
      closingTime:DataTypes.TIME,
      description: DataTypes.TEXT,
      slots: DataTypes.INTEGER,
      takenSlots: DataTypes.INTEGER,
   
    },
    {
      tableName: 'tbl_garages',
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    },
  );
  return Garage;
};

export default GarageModel;
