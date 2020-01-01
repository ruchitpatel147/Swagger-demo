'use strict';

const {assert} = require('chai');
const sinon = require('sinon');
const Service = require('./../app/service/StudentService');
const model = require('./../app/model/User');



describe('student()', function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });
  afterEach(function () {
    sandbox.restore();
  });

  it('success response', function (done) {
    let swagger = {
      student_id: {
        value: '1'
      }
    };

    let expectedQuery = {id: 1}
    sandbox.stub(model, 'findOne').callsFake((_query, callback) => {
      assert.deepEqual(_query, expectedQuery, 'Expected query does not matched');
      callback();
    });
    let endSpy = sandbox.spy((response) => {
      done();
    })
    let responseHeaderSpy = sandbox.spy();
    let callSpy = sandbox.spy();
    let res = {
      statusCode: 0,
      setHeader: responseHeaderSpy,
      end: endSpy
    };
    let service = new Service();
    service.getStudent(swagger, res, callSpy);
  })

});