const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')

dotenv.config();

exports.service = new Sequelize('postgres', process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
});

exports.sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
});
