const StudentService = require('../service/StudentService');
module.exports.createStudent = function createStudent(req, res, next) {
  var studentService = new StudentService();
  studentService.createStudent(req.swagger.params, res, next);
};

module.exports.getStudents = function getStudents(req, res, next) {
  var studentService = new StudentService();
  studentService.getStudents(req.swagger.params, res, next);
};

module.exports.getStudent = function getStudent(req, res, next) {
  let logger = req.Logger;
  var studentService = new StudentService(logger);
  studentService.getStudent(req.swagger.params, res, next);
};

module.exports.upload = function upload(req, res, next) {
  var studentService = new StudentService();
  studentService.upload(req, res, next);
};