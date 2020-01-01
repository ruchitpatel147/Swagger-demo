const jwtSecurityHelper = require('./helper/jwtSecurityHelper');

module.exports = function (app) {
  require('./route/user')(app);
  app.use(jwtSecurityHelper.verifyJWT);
  require('./route/student')(app);
};