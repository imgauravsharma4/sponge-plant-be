const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const chalk = require('chalk');
const options = require('../config/options');

const db = {};
let sequelize;
(async () => {
  if (env === options.server.PRODUCTION) {
    // config.dialectModule = require('mysql2');
    console.log('config', config);
    sequelize = new Sequelize(process.env.DATABASE_URL, config);
  } else {
    sequelize = new Sequelize(
      process.env[config.database],
      process.env[config.username],
      process.env[config.password],
      config
    );
  }

  sequelize
    .authenticate()
    .then(() => {
      console.log(
        '%s Database connection has been established successfully.',
        chalk.green('✓')
      );
    })
    .catch((err) => {
      console.error(
        '%s Unable to connect to the database:',
        chalk.red('X'),
        err
      );
    });

  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
})();
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
