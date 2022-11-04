import { Sequelize } from 'sequelize';

const { NODE_ENV, DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  benchmark: true,
});

sequelize.authenticate();

export default sequelize;
