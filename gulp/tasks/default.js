'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('default', function () {
  if (release) {
    runSequence(
      'clean',
      // ['index', 'styles', 'images', 'assets', 'templates', 'lint'],
      ['index', 'styles', 'images', 'assets', 'templates'],
      'browserify',
      ['minify', 'serve']
    );
  } else {
    runSequence(
      'clean',
      // ['index', 'styles', 'images', 'assets', 'templates', 'lint'],
      ['index', 'styles', 'images', 'assets', 'templates'],
      ['watchify', 'watch', 'serve']
    );
  }
});
