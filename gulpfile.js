'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');

gulp.task('sass', function () {
  var baseCssStream = gulp.src('_static/styles/base.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError));

  var normalize = gulp.src('node_modules/normalize.css/normalize.css');
  var pygments = gulp.src('_styles/pygments.css');

  return merge(normalize, pygments, baseCssStream)
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(gulp.dest('static/css'));
});

gulp.task('scripts', function() {
  return gulp.src([
    'node_modules/slideout/dist/slideout.js',
    '_static/scripts/scripts.js'
  ])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/js'));
});

gulp.task('fonts', function() {
  return gulp.src([
    '_static/fonts/*'
  ])
    .pipe(gulp.dest('static/fonts'));
});

gulp.task('images', function() {
  return gulp.src([
    '_static/images/*'
  ])
    .pipe(gulp.dest('static/images'));
});

gulp.task('default', ['sass', 'scripts', 'fonts', 'images']);
