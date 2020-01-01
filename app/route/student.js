const Student = require('../model/student');

module.exports = function (app) {

  app.get('/student', function (req, res) {
    Student.find({}, function (err, students) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(students));
    })
  });

  app.get('/student/:studentId', function (req, res) {
    let studentId = req.params.studentId;
    Student.findOne({_id: studentId}, function (err, studentRecord) {
      if(err){
        console.log('An error has occurred ', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: 'An error has occurred'}));
        return;
      }
      //check if student is empty or not return 404
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(studentRecord));
    });
  });

  app.post('/student', function (req, res) {
    let student = new Student({
      'age': req.body.age,
      'name': req.body.name,
      'address': req.body.address
    });
    student.save(function (err, savedStudent) {
      if(err){
        console.log('An error has occurred ', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: 'An error has occurred'}));
        return;
      }
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(savedStudent));
    });
    //add a new student
  })

  app.delete('/student/:studentId', function (req, res) {
    let studentId = req.params.studentId;
    Student.findOne({_id: studentId}, function (err, studentRecord) {
      if(err){
        console.log('An error has occurred ', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: 'An error has occurred'}));
        return;
      }
      if(studentRecord){
        studentRecord.remove(function (err) {
          if(err){
            console.log('An error has occurred while deleting', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({error: 'An error has occurred'}));
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(studentRecord));
          return;
        });
        return;
      }
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({'message': 'user not found!!'}));
    });
  })
};