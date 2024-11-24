const chalk = require('chalk');
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected', () => {
  console.log(chalk.green('✓'), 'Mongoose connection establish successfully');
});

// If the connection throws an error
mongoose.connection.on('error', (error) => {
  console.log(chalk.red('X'), 'Mongoose default connection error: ', error);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log(chalk.red('-X-'), 'Mongoose default connection disconnected');
});
