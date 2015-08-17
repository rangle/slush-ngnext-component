var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire =  require('proxyquire');
var Promise = require('bluebird');

var inquirerMock = {
  prompt: sinon.spy(function(prompts, cb) {
    cb({
      'name': 'my-test-component'
    });
  })
}

var gulpMock = {
  src: sinon.spy(function() {
    return this;
  }),
  pipe: sinon.spy(function() {
    return this;
  }),
  dest: sinon.spy(function () {

  }),
  on: sinon.spy(function() {

  })
}

var templateMock = sinon.spy();
var renameMock = sinon.spy();
var conflictMock = sinon.spy();

var core = proxyquire('../core', {
  inquirer: inquirerMock,
  gulp: gulpMock,
  'gulp-rename': renameMock,
  'gulp-template': templateMock,
  'gulp-conflict': conflictMock
})



describe('Core', function () {

  it('should return error message if input has space', function () {
    expect(core.validateInput('my component')).to.be.a('String');
    expect(core.validateInput('my-component')).to.eql(true);
  });

  it('should return files with component name', function () {
    var component = {
      name:'HelloComponent'
    };

    var file = {
      basename: 'component',
      extname: '.ts'
    };

    var file2 = {
      basename: 'component',
      extname: '.html'
    }

    var file3 = {
      basename: 'component',
      extname: '.js'
    }

    var makeComponentFile = core.replaceWithAnswers(component);

    expect(makeComponentFile(file)).to.eql({
      basename: 'HelloComponent',
      extname: '.ts'
    });

    expect(makeComponentFile(file2)).to.eql({
      basename: 'hello-component',
      extname: '.html'
    })

    expect(makeComponentFile(file3)).to.eql({
      basename: 'HelloComponent',
      extname: '.js'
    })
  });

  it('should prompt', function () {
    core.prompt().then(function(res) {
       expect(inquirerMock.prompt.calledOnce).to.eql(true);
    })

  });

  it('should generate using the right tools', function () {
    var cb = sinon.spy();
    var generateWithCallback = core.generate(cb);
    var component = {
      name: 'my-test-component'
    }

    generateWithCallback(component);

    expect(templateMock.calledWith(component)).to.eql(true);
    expect(conflictMock.calledWith('./')).to.eql(true);
    expect(gulpMock.dest.calledWith('./')).to.eql(true);
    expect(renameMock.calledOnce).to.eql(true);
  })

  it('should format string to camel case', function () {
    var name = 'HelloComponentOne';
    expect(core.format(name, 0)).to.be.equal('helloComponentOne');
  })

  it('should format string to hyphen case', function () {
    var name = 'HelloComponentOne';
    expect(core.format(name, 1)).to.be.equal('hello-component-one');
  })

});
