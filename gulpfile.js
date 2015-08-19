'use strict';
var gulp = require('gulp');
var slushTask = require('./slushfile');
var prettify = require('gulp-jsbeautifier');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');


gulp.task('test', function (cb) {
  gulp.src('core.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['tests/**/*.js'])
        .pipe(mocha({
          reporter: 'min'
        }))
        .on('error', cb)
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('ci-test', function (cb) {
  gulp.src('core.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['tests/**/*.js'])
        .pipe(mocha({
          reporter: 'min'
        }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
          thresholds: {
            global: 90
          }
        }))
        .on('end', cb);
    });
});

gulp.task('test:auto', function () {
  gulp.watch(['tests/**/*.test.js', 'core.js', ], ['test']);
});

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