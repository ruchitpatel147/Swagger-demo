const Student = require('../model/student');
const fs = require('fs');

let a;

class StudentService{

  constructor (logger) {
    a = logger;
  };

  getStudents(swaggerParams, res, next){
    Student.find({}, function (err, students) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(students));
    })
  };

  getStudent(swaggerParams, res, next){
    var studentId = swaggerParams.student_id.value;
    Student.findOne({_id: studentId}, function (err, student) {
      if(student){
        a.info('GET call success');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(student));
        return;
      }
      a.info('RESOURCE NOT FOUND');
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({message:'The specified student does not exist'}));
      return;
    })
  };

  createStudent(swaggerParams, res, next){
    let payload = swaggerParams.student.value;
    let student = new Student(payload);
    student.save(function (err, studentRecord) {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(studentRecord));
    })
  };

  upload(req, res, next){

    let filename = fs.createWriteStream("upload/abc.png");
    filename.once('open', () => {
      filename.write(req.files.upfile[0].buffer)
      //filename.write('asdsadas');
    });
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify('File uploaded'));

    /*let payload = swaggerParams.student.value;
    let student = new Student(payload);
    student.save(function (err, studentRecord) {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(studentRecord));
    })*/
  };

}

module.exports = StudentService;