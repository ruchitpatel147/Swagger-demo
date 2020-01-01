const {assert} = require('chai');
const app = require('./../app');

describe('App() test cases', function () {

  it('module', function () {
    assert.equal(app(), 'hello1', 'Expected response does not matched');
  })
});