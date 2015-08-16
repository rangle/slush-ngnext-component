'use strict';

var gulp = require('gulp');
var core = require('./core');

gulp.task('default', run);
module.exports = run;

function run(done) {
  core.prompt()
    .then(core.generate(done))

};
