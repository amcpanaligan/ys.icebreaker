var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

// use this task for debug mode (non-minified)
gulp.task('concat', function() {
  return gulp.src(['./app/**/*.js', '!./app/dist/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./app/dist/'));
});
 
// use this task for performance loading of compiled/minified application scripts
gulp.task('uglify', function() {
  gulp.src(['./app/**/*.js', '!./app/dist/*.js'])
    .pipe(uglify('main.min.js'))
    .pipe(gulp.dest('./app/dist/'))
});
