// 'use strict';
//
// const Mocha = require('mocha');
// const fs = require('fs');
// const async = require('async');
// const _ = require('lodash');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
//
//
// const excludedEnv = ['beta', 'production', 'sandbox', 'default'];
// if (process.env.NODE_ENV === undefined || excludedEnv.indexOf(process.env.NODE_ENV) !== -1) {
//   // eslint-disable-next-line no-console
//   console.log('Cannot run test cases from environment ' + process.env.NODE_ENV);
//   return process.exit(1);
// }
// var options = {
//   'reporter': 'spec'
// };
//
// // Instantiate a Mocha instance.
// var mocha = new Mocha(options);
// var testDir = './test/';
// // List of directories that will run at the end
// var excludedDir = ['endpoint'];
// // To run only specific unit test add your class here in a
//
// var runner = null;
//
// // Execute all test added to mocha runlist
// var runMocha = function runMocha() {
//   runner = mocha.run(function run(failures) {
//     process.on('exit', function onExit() {
//       process.exit(failures);  // exit with non-zero status if there were failures
//     });
//   });
//   // Listen to the end event to kill the current process
//   runner.on('end', function endProcess() {
//     process.exit(0);
//   });
// };
//
// runMocha();
// // Load the files into mocha run list if the file ends with JS
// // This means the test directories can only have test and NO code files
// var loadFiles = function loadTestFiles(file, path) {
//   // eslint-disable-next-line no-sync
//   var pathStat = fs.statSync(path);
//   if (pathStat && pathStat.isDirectory() && excludedDir.indexOf(file) === -1) {
//     // If current file is actually a dir we call readTestDir. This will make the function
//     // recursive until the last tier
//     readTestDir(path + '/');
//   } else if (file.substr(-3) === '.js') {
//     mocha.addFile(path);
//   }
// };
//
// // Read all files/dirs recursively from the specified testing directory
// var readTestDir = function readTestDirectory(path) {
//   // Project is still small so can do it synchronous
//   // eslint-disable-next-line no-sync
//   fs.readdirSync(path).forEach(
//     function forEach(file) {
//       loadFiles(file, path +  file);
//     }
//   );
// };
