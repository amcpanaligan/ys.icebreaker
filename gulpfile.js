var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var bundle = require('gulp-bundle-assets');

// use this task for debug mode (non-minified)
gulp.task('concat-js', function () {
    return gulp.src(['./app/**/*.js', '!./app/dist/*.js'])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./app/dist/'));
});

// use this task for performance loading of compiled/minified application scripts
gulp.task('min-js', function () {
    gulp.src(['./app/**/*.js', '!./app/dist/*.js'])
      .pipe(uglify('main.min.js'))
      .pipe(gulp.dest('./app/dist/'));
});

gulp.task('bundle', function() {
  return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(gulp.dest('./app/dist/'));
});
