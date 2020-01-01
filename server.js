const express = require('express');
const app = express();
const mongoose = require('mongoose');
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const fs = require('fs');
const winston = require('winston');
const logger = require('./logger');
const Url = require('url');
logger.setup(winston);
let log = logger.getContext();
const jwtSecurityHelper = require('./app/helper/jwtSecurityHelper');
// swaggerRouter configuration
var options = {
  swaggerUi: __dirname + '/app/swagger.json',
  controllers: __dirname + '/app/controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

var spec = fs.readFileSync(__dirname + '/app/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

mongoose.connect('mongodb://localhost/traineeDb', { useNewUrlParser: true });

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {


  app.use((req,res,next) => {
    let parsedUrl = Url.parse(req.url);
    req.basePathName = parsedUrl.pathname;
    let logMessage = req.method + ' request started for: ' + req.basePathName;
    log.info(logMessage, {
      method: req.method,
      url: req.url
    });
    req.Logger = log;
    return next();
  })

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  //validate the routes
  //app.use(jwtSecurityHelper.verifyJWT);

  // Route validated requests to appropriate controller

  app.use(middleware.swaggerRouter(options));


  app.use(middleware.swaggerUi({
    "swaggerUi": "/docs",
    "apiDocs": "/v1/api-docs"
  }));


});

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//require('./app/router')(app);

// Start the server
app.listen(3001, function listen() {
  // eslint-disable-next-line no-console
  console.log('Your server is listening on port %d (http://localhost:%d)', 3001, 3001);
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'ci') {
    // eslint-disable-next-line no-console
    console.log('Swagger-ui is available on http://localhost:%d/docs', 3001);
  }
});

console.log('Server has been started on localhost at port ' + 3001);