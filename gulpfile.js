var gulp = require('gulp');
var rename = require('gulp-rename');
var add = require('gulp-add-src');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

gulp.task('default', ['build-scripts', 'build-css']);

gulp.task('build-scripts', function () {
  var browserify = require('gulp-browserify');
  var babelify = require('babelify');

  gulp.src('./src/js/index.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : true,
      transform: babelify.configure({
        optional: ['es7.classProperties',
          'es7.objectRestSpread'
        ]
      })
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('build-css', function () {
  var postcss = require('gulp-postcss');
  var concatCss = require('gulp-concat-css');
  var autoprefixer = require('autoprefixer-core');
  var lost = require('lost');

  return gulp.src('src/css/**/*.css')
    .pipe(postcss([
      require('postcss-nested'),
      lost(),
      require('postcss-center'),
      autoprefixer({ browsers: ['last 2 versions'] })
    ]))
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('build-scripts-production', function () {
  var browserify = require('gulp-browserify');
  var babelify = require('babelify');

  gulp.src('./src/js/index.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : false,
      transform: babelify.configure({
        optional: [
          'es7.classProperties',
          'es7.objectRestSpread'
        ]
      })
    }))
    .pipe(uglify({
      mangle: true,
      compress: true
    }))
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('build-css-production', function () {
  var postcss = require('gulp-postcss');
  var concatCss = require('gulp-concat-css');
  var autoprefixer = require('autoprefixer-core');
  var lost = require('lost');

  gulp.src(['src/css/**/*.css', 'src/lib/materialize/materialize.css'])
    .pipe(postcss([
      require('postcss-nested'),
      lost(),
      require('postcss-center'),
      autoprefixer({ browsers: ['last 2 versions'] })
    ]))
    .pipe(concatCss('bundle.min.css'))
    .pipe(gulp.dest('dist/css'));
});