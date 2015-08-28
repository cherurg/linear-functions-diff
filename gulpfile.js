var gulp = require('gulp');
var rename = require('gulp-rename');

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
  var sourcemaps = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer-core');
  var lost = require('lost');

  return gulp.src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-nested'),
      lost(),
      autoprefixer({ browsers: ['last 2 versions'] })
    ]))
    .pipe(concatCss('bundle.css'))
    .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('dist/css') );
});