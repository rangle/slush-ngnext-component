'use strict';

module.exports = function () {
  var gulp = require('gulp');
  var Promise = require('bluebird');
  var conflict = require('gulp-conflict');
  var template = require('gulp-template');
  var rename = require('gulp-rename');
  var _ = require('underscore.string');
  var inquirer = require('inquirer');
  var path = require('path');

  return {
    validateInput: validateInput,
    replaceWithAnswers: replaceWithAnswers,
    prompt: prompt,
    generate: generate,
    format: format
  }

  function validateInput(input) {
    var errorMessage = 'Input contains invalid characters! Please try again';
    if (input.split(' ').length > 1) {
      return errorMessage;
    }
    return true;
  }

  function replaceWithAnswers(component) {
    return function (file) {
      //If all files generated are to be renamed
      //then this if statement will be removed
      if (file.basename === 'template' && file.extname === '.ts') {
        file.basename = file.basename.replace(/template/, component.name);
      } else if (file.basename === 'template' && file.extname === '.html') {
        file.basename = file.basename.replace(/template/, format(component.name, 1));
      } else if (file.basename === 'component') {
        // file.basename = file.basename.replace(/component/, component.name);
      }
      return file;
    }
  }

  function prompt() {
    return new Promise(function (resolve) {
      var prompts = [{
        name: 'name',
        message: 'What is the name of your component?',
        validate: validateInput,
        default: 'HelloComponent'
      }, {
        name: 'module',
        message: 'What is the name of your module?',
        validate: validateInput,
        default: 'NewModule'
      }];
      return inquirer.prompt(prompts, resolve);
    });
  }

  function generate(done) {
    return function (component) {

      component.componentName = component.name;
      component.serviceName = component.name;
      component.constName = component.name;
      component.componentNameSelector = format(component.name, 0);
      component.componentNameTemplate = format(component.name, 1);

      gulp.src(__dirname + '/templates/**')
        .pipe(template(component))
        .pipe(rename(replaceWithAnswers(component)))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .on('end', done);
    }
  }

}();


function format(str, type) {
  // type = 0 => to camel case
  // type = 1 =? to hypehn string
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    var output = index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    if (type) {
      output = index == 0 ? letter.toLowerCase() : '-' + letter.toLowerCase();
    }
    return output;
  }).replace(/\s+/g, '');
}