'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let pump = require('pump');
let pngquant = require('imagemin-pngquant');
let eslint = require( 'gulp-eslint' );
let fs = require( 'gulp-fs' );
let rimraf = require('rimraf');

let sass = require('gulp-sass');
let less = require('gulp-less');

/* Add browsers' prefixes */
gulp.task('autoprefixer', () =>
  gulp.src('./app/pages/grid/prj_sass/sass/style.scss')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./app/pages/grid/prj_sass/sass'))
);

// /* Checking for validation */
// gulp.task( 'lint', () => {
//   return gulp.src([ 'app/**/*.js' ])
//     .pipe(eslint({
//       extends : 'eslint:recommended'
//     }))
// });

/* Clean the assembly */
gulp.task('clean', function (cb) {
  rimraf('./build', cb);
});

/* Compress *.css files */
gulp.task('css-min', ['autoprefixer'], () => {
  return gulp.src('./app/pages/grid/prj_sass/sass/style.scss')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./app/pages/grid/prj_sass/css'));
});

/* Compress *.jpeg/*.png files */
gulp.task('image-min', () =>
  gulp.src('./app/pages/grid/prj_less/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest('./app/pages/grid/prj_less/images/v1'))
);

/* Compress *.js files */
// gulp.task('js-min', function (cb) {
//   pump([
//       gulp.src('libs/*.js'),
//       uglify(),
//       gulp.dest('build/js')
//     ], cb
//   );
// });

/* Sass/SCSS -> CSS */
gulp.task('sass', ['autoprefixer'], () => {
  return gulp.src('./app/pages/grid/prj_sass/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/pages/grid/prj_sass/css'))
});