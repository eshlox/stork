'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  var scssStream = gulp.src('_static/styles/base.scss')
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}));

  // var cssStream = gulp.src('node_modules/offside-js/dist/offside.css')
  //   .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  //   .pipe(cleanCSS({compatibility: 'ie8'}));

  var mergedStream = merge(scssStream)
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static/css'));

  return mergedStream;
});

gulp.task('scripts', function() {
  return gulp.src([
    // 'node_modules/offside-js/dist/offside.js',
    'node_modules/slideout/dist/slideout.js',
    // 'node_modules/minigrid/src/index.js',
    'node_modules/headroom.js/dist/headroom.js',
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
