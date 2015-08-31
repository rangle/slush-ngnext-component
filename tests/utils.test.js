var expect = require('chai').expect;
var prompts = require('../src/prompts');
var utils = require('../src/utils');
var tasks = require('../src/tasks');


describe('Utils', function() {

  it('utils should exist', function() {
    expect(utils).to.be.a('Object');
  });


  it('utils should process string to camel case', function() {
    var name = 'HelloComponent';
    var output = 'helloComponent';
    var result = utils.format(name, 0);

    expect(result).to.be.a('String');
    expect(result).to.be.eq(output);
  });

  it('utils should process string to hyphen string', function() {
    var name = 'HelloComponent';
    var output = 'hello-component';
    var result = utils.format(name, 1);

    expect(result).to.be.a('String');
    expect(result).to.be.eq(output);
  });

  it('utils should process string to hyphen string', function() {
    var name = 'HelloComponent';
    var output = 'hello-component';
    var result = utils.validateInput(name);

    expect(result).to.be.a('Boolean');
  });


});
