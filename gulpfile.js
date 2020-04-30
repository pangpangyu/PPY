const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer')
const babel = require("gulp-babel");
const htmlmin = require('gulp-htmlmin')
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const clean = require('gulp-clean')
const browserify = require('gulp-browserify');

gulp.task('default',gulp.series(cleanDri,css,js,html))

function cleanDri(){
  return gulp.src('dist')
        .pipe(clean());
}

function css(){
  return gulp.src('src/css/*.scss')
          .pipe(sass())
          .pipe(cleanCss({compatibility: 'ie8'}))
          .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true
          }))
          .pipe(rename({suffix:'.min'}))
          .pipe(rev())
          .pipe(gulp.dest('dist/css'))
          .pipe(rev.manifest())
          .pipe(gulp.dest('dist/css'));
}

function js(){
  return gulp.src('src/js/*.js')
          .pipe(browserify())
          .pipe(babel())
          .pipe(uglify({mangle:true,compress:false}))
          .pipe(rename({suffix:'.min'}))
          .pipe(rev())
          .pipe(gulp.dest('dist/js'))
          .pipe(rev.manifest())
          .pipe(gulp.dest('dist/js'));
}

function html(){
  return gulp.src(['dist/**/*.json','src/*.html'])
          .pipe(htmlmin({
            removeComments: true,
            removeEmptyAttributes: true
          }))
          .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
              'css': './css',
              'js': './js'
            }
          }))
          .pipe(gulp.dest('dist'))
}


