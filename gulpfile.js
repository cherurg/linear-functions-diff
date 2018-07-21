let gulp = require('gulp')
let rename = require('gulp-rename')
let add = require('gulp-add-src')
let sourcemaps = require('gulp-sourcemaps')
let concat = require('gulp-concat')
let uglify = require('gulp-uglifyjs')
let watch = require('gulp-watch')
let browserSync = require('browser-sync').create()

gulp.task('default', ['build-scripts', 'build-css'])

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  })
})

gulp.task('watch', () => {
  let run = () => gulp.start('default')
  gulp.start('browser-sync')
  watch('./src/**/*.js', run)
  watch('./src/**/*.css', run)
  watch('./dist/**/*.*', () => browserSync.reload())
})

gulp.task('build-scripts', function() {
  let browserify = require('gulp-browserify')
  let babelify = require('babelify')

  gulp
    .src('./src/js/index.js')
    .pipe(
      browserify({
        insertGlobals: true,
        debug: true,
        transform: babelify.configure({
          optional: ['es7.classProperties', 'es7.objectRestSpread'],
        }),
      }),
    )
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('build-css', function() {
  let postcss = require('gulp-postcss')
  let concatCss = require('gulp-concat-css')
  let autoprefixer = require('autoprefixer-core')
  let lost = require('lost')

  return gulp
    .src('src/css/**/*.css')
    .pipe(
      postcss([
        require('postcss-nested'),
        lost(),
        require('postcss-center'),
        autoprefixer({ browsers: ['last 2 versions'] }),
      ]),
    )
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('build-scripts-production', function() {
  let browserify = require('gulp-browserify')
  let babelify = require('babelify')

  gulp
    .src('./src/js/index.js')
    .pipe(
      browserify({
        insertGlobals: true,
        debug: false,
        transform: babelify.configure({
          optional: ['es7.classProperties', 'es7.objectRestSpread'],
        }),
      }),
    )
    .pipe(
      uglify({
        mangle: true,
        compress: true,
      }),
    )
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('build-css-production', function() {
  let postcss = require('gulp-postcss')
  let concatCss = require('gulp-concat-css')
  let autoprefixer = require('autoprefixer-core')
  let lost = require('lost')

  gulp
    .src(['src/css/**/*.css', 'src/lib/materialize/materialize.css'])
    .pipe(
      postcss([
        require('postcss-nested'),
        lost(),
        require('postcss-center'),
        autoprefixer({ browsers: ['last 2 versions'] }),
      ]),
    )
    .pipe(concatCss('bundle.min.css'))
    .pipe(gulp.dest('dist/css'))
})
