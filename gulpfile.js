'use strict';
var gulp = require('gulp');
var slushTask = require('./slushfile');
var prettify = require('gulp-jsbeautifier');

gulp.task('beautify', function () {
  gulp.src('*.js', {
      base: '.'
    })
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('serve', slushTask);
