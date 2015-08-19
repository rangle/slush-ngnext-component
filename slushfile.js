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

var defaults = (function () {
  var workingDirName = path.basename(process.cwd()),
    homeDir, osUserName, configFile, user;

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE;
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
  } else {
    homeDir = process.env.HOME || process.env.HOMEPATH;
    osUserName = homeDir && homeDir.split('/').pop() || 'root';
  }

  configFile = path.join(homeDir, '.gitconfig');
  user = {};

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }

  return {
    moduleName: workingDirName,
    componentName: 'HelloComponent'
  };
})();

function task(done) {

  var prompt = prompts[gulp.args[0]];
  var path = '/templates/ng-course/' + gulp.args[0] + '/**';
  console.log(path);

  inquirer.prompt(prompt,
    function (answers) {
      if (!answers.moveon) {
        return done();
      }
      answers.componentSelector = utils.format(answers.componentName, 0);
      answers.componentNameSelector = utils.format(answers.componentName, 0);
      answers.componentNameTemplate = utils.format(answers.componentName, 0);
      answers.serviceName = utils.format(answers.componentName, 0);
      answers.constName = utils.format(answers.componentName, 0);
      answers.module = _.slugify(answers.moduleName);

      gulp.src(__dirname + path)
        .pipe(template(answers))
        .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          }
        }))
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

gulp.task('default', task);