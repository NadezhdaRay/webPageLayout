'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');

let sass = require('gulp-sass');
let less = require('gulp-less');

/* Add browsers' prefixes */
gulp.task('autoprefixer', () =>
  gulp.src('./pages/grid/_prj_sass/css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./pages/grid/_prj_sass/css'))
);

/* Clean the assembly */
gulp.task('clean', function (cb) {
  rimraf('./build', cb);
});

/* Compress *.jpeg/*.png files */
gulp.task('image-min', () =>
  gulp.src('./pages/grid/_prj_sass/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest('./pages/grid/_prj_sass/images/v1'))
);

gulp.task('sass', ['autoprefixer'], () => {
  return gulp.src('./app/pages/grid/prj_sass/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/pages/grid/prj_sass/css'))
});

gulp.task('less', () => {
  return gulp.src('./app/pages/flex/_prj_less/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./app/pages/flex/_prj_less/css'));
});