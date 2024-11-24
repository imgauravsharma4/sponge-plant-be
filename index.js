const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
/**
 * Create Express server.
 */

const app = express();

app.use(cors({ origin: true }));

/**
 * Start Express server.
 */

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
  require('./config/dbConnection');
});

/**
 * Express configuration.
 */

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use(
  '/',
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

// application specific logging, throwing an error, or other logic here
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('req body', req.body);
    console.log('req query', req.query);
  }
  next();
});
// Routes
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

module.exports = app;
