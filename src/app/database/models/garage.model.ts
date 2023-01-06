import { Model, DataTypes, Sequelize } from 'sequelize';

export class Garage extends Model {}

const GarageModel = (sequelize: Sequelize) => {
  Garage.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      address: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      imageUrl: DataTypes.STRING,
      userId: DataTypes.UUID,
      hourlyFee:DataTypes.DOUBLE,
      openingTime:DataTypes.TIME,
      closingTime:DataTypes.TIME,
      description: DataTypes.TEXT,
      slots: DataTypes.INTEGER,
      takenSlots:{ 
        type: DataTypes.INTEGER,
        defaultValue:0
      }
   
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
