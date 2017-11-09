'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

let cleanCSS = require('gulp-clean-css');

var uglify = require('gulp-uglify');
var pump = require('pump');
var pngquant = require('imagemin-pngquant');
var eslint = require( 'gulp-eslint' );
var fs = require( 'gulp-fs' );

var sass = require('gulp-sass');
var less = require('gulp-less');

/* Add browsers' prefixes */
gulp.task('autoprefixer', () =>
  gulp.src('css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('build/css'))
);

/* Checking for validation */
gulp.task( 'lint', () => {
  return gulp.src([ 'app/**/*.js' ])
    .pipe(eslint({
      extends : 'eslint:recommended'
    }))
});

/* Compress *.css files */
gulp.task('css-min', ['autoprefixer'], () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

/* Compress *.jpeg/*.png files */
gulp.task('image-min', () =>
  gulp.src('images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest('build/images'))
);

/* Compress *.js files */
gulp.task('js-min', function (cb) {
  pump([
      gulp.src('lib/*.js'),
      uglify(),
      gulp.dest('build/js')
    ], cb
  );
});

/* Sass/SCSS -> CSS */
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
});