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
    generate: generate
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
      if (file.basename === 'component') {
        file.basename = file.basename.replace(/component/, component.name);
      }
      return file;
    }

  }

  function prompt() {
    return new Promise(function (resolve) {
      var prompts = [{
        name: 'name',
        message: 'What is the name of your component?',
        validate: validateInput
      }];
      return inquirer.prompt(prompts, resolve);
    });
  }

  function generate(done) {
    return function (component) {
      gulp.src(__dirname + '/templates/**')
        .pipe(template(component))
        .pipe(rename(replaceWithAnswers(component)))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .on('end', done);
    }
  }

}();
