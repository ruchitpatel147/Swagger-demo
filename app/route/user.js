const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtSecurityHelper = require('../helper/jwtSecurityHelper');


module.exports = function (app) {
  app.post('/user/sign-up', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      if(err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({'message': 'Error occurred finding record'}));
        return;
      }
      if(user){
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({'message': 'User already exist'}));
        return;
      }
      var password = req.body.password;
      bcrypt.hash(password, saltRounds, function(hashError, hashPassword) {
        if(hashError){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({'message': 'Error occurred creating hash'}));
          return;
        }
        var newUser = new User({
          email: req.body.email,
          password: hashPassword
        });
        return newUser.save(function (errSave, createdUser) {
          if(errSave){
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({'message': 'Error occurred while saving record'}));
            return;
          }
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({'message': 'User created'}));
          return;
        });
      });
    });
  });

  app.post('/user/log-in', function (req, res) {
      User.findOne({email: req.body.email}, function (err, user) {
        if(user){
          bcrypt.compare(req.body.password, user.password, function (errCompare, comparedSuccess) {
            if(errCompare){
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({'message': 'Error occurred while comparing password'}));
              return;
            }
            if(comparedSuccess){
              var payload = {
                email: req.body.email
              };
              return jwtSecurityHelper.signJWT(payload, function (signError, token) {
                if(signError){
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({'message': 'Error occurred while singing JWT token'}));
                  return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({'token': token}));
                return;
              });
              return;
            }
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({'message': 'Password incorrect'}));
            return;
          });
          return;
        }
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({'message': 'User does not exist'}));
    });
  })
};