'use strict';

var gulp = require('gulp');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var _ = require('underscore.string');
var inquirer = require('inquirer');
var path = require('path');

gulp.task('default', function (done) {
  var prompts = [
    {
      name: 'name',
      message: 'What is the name of your component?',
      validate: validateInput
    }
  ];

  inquirer.prompt(prompts, function (component) {

    gulp.src(__dirname + '/templates/**')
    .pipe(template(component))
    .pipe(rename(replaceWithAnswers(component)))
    .pipe(conflict('./'))
    .pipe(gulp.dest('./'))
    .pipe(install())
    .on('end', done);
  });

  function validateInput(input) {
    var errorMessage = 'Input contains invalid characters! Please try again';
    if (input.split(' ').length > 1) {
      return errorMessage;
    }

    return true;

  };

  function replaceWithAnswers(component) {
    return function(file){
      if (file.basename === 'component'){
        file.basename = file.basename.replace(/component/,component.name);
      }
    }

  }

});
