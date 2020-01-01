const jwt = require('jsonwebtoken');
const secret = 'someSecret';

module.exports = {
  signJWT: function signJWT(payload, callback) {
    jwt.sign(payload, secret, function (err, token) {
      if(err){
        return callback(err);
      }
      return callback(null, token);
    });
  },
  verifyJWT: function verifyJWT(req, res, next) {
    var token = req.headers['x-request-jwt'];
    jwt.verify(token, secret, function (err, decoded) {
      if(err){
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: 'User not authorized'}));
        return;
      }
      return next();
    });
  },
}