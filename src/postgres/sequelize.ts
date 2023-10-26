import { Options, Sequelize, DataTypes, Model } from 'sequelize';
import { postgresConfig } from '../config';

const { max, ...config } = postgresConfig;

const options: Options = {
  dialect: 'postgres',
  host: config.host,
  username: config.user,
  password: config.password,
  port: config.port,
  database: config.database,
  pool: {
    min: 0,
    max,
  },
  logging: false,
};

if (!max) {
  delete options.pool;
}

const sequelize = new Sequelize(options);

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, underscored: true, tableName: 'users' }
);

export const sequelizePostgresGetUser = (id: number) =>
  User.findOne({
    where: {
      id,
    },
  });

export const sequelizeClose = () => sequelize.close();
