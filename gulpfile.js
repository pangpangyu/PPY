const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer')
const babel = require("gulp-babel");
const htmlmin = require('gulp-htmlmin')
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector')
const clean = require('gulp-clean')
const browserify = require('gulp-browserify')
const replace = require('gulp-replace')
const header = require('gulp-header')

const pkg = require('./package.json')

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('default',gulp.series(cleanDri,css,js,html))

gulp.task('clean',gulp.series(cleanDri))

function cleanDri(){
  return gulp.src('dist')
        .pipe(clean());
}

// gulp.watch('src/js/*.js',function(){
//   js()
// })

// gulp.watch('src/css/*.scss',function(){
//   css()
// })

// gulp.watch('src/*.html',function(){
//   html()
// })
function css(){
  return gulp.src('src/css/*.scss')
          .pipe(sass())
          .pipe(cleanCss({compatibility: 'ie8'}))
          .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true
          }))
          .pipe(replace(/(\d+)px/g, function(match, p1){
            return Number(p1) / 16 + 'rem';
          }))
          .pipe(rename({suffix:'.min'}))
          .pipe(rev())
          .pipe(header(banner, { pkg: pkg }))
          .pipe(gulp.dest('dist/css'))
          .pipe(rev.manifest())
          .pipe(gulp.dest('dist/css'));
}

function js(){
  return gulp.src('src/js/*.js')
          .pipe(browserify())
          .pipe(babel())
          .pipe(uglify({mangle:{toplevel:true}}))
          .pipe(rename({suffix:'.min'}))
          .pipe(rev())
          .pipe(header(banner, { pkg: pkg }))
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


