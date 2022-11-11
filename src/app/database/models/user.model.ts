import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {}

const UserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 
        // defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      fullName: DataTypes.STRING,
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      dateOfBirth:DataTypes.DATE,
      password: DataTypes.STRING,
      companyId:DataTypes.UUID,
      role: {
        type: DataTypes.STRING,
        defaultValue: 'normal',
      },
      status: {
        type: DataTypes.INTEGER,
        comment: '0:offline,1:online',
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'tbl_users',
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    },
  );
  return User;
};

export default UserModel;
