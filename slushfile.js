'use strict';

var gulp = require('gulp'),
  install = require('gulp-install'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  _ = require('underscore.string'),
  inquirer = require('inquirer'),
  path = require('path');

var prompts = require('./src/prompts');
var utils = require('./src/utils');
var tasks = require('./src/tasks');

function replaceWithAnswers(component) {
  return function (file) {
    //If all files generated are to be renamed
    //then this if statement will be removed
    if (file.basename === 'template' && file.extname === '.ts') {
      file.basename = file.basename.replace(/template/, component.name);
    } else if (file.basename === 'template' && file.extname === '.html') {
      file.basename = file.basename.replace(/template/, utils.format(component.name, 1));
    }
    return file;
  }
}

function task(done) {

  if (gulp.args.length === 0) {
    throw 'You need to pass component type';
  } else if (gulp.args.length > 1) {
    throw 'You can only pass one component name';
  }

  var prompt = prompts[gulp.args[0]];
  var path = '/templates/ng-course/' + gulp.args[0] + '/**';

  inquirer.prompt(prompt,
    function (answers) {
      if (!answers.moveon) {
        return done();
      }

      answers.name = answers.componentName || answers.serviceName || answers.constantName
      answers.componentNameSelector = utils.format(answers.name, 0);
      answers.componentNameTemplate = utils.format(answers.name, 1);

      gulp.src(__dirname + path)
        .pipe(template(answers))
        .pipe(rename(replaceWithAnswers(answers)))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .pipe(install())
        .on('end', function () {
          done();
        });
    });
}

(function () {
  tasks.forEach(function (t) {
    gulp.task(t.name, task);
  })
})();
