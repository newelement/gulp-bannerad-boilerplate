const gulp = require('gulp');
const watch = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const jsmin = require('gulp-jsmin');

gulp.task('sass', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));
});

/* babel-preset-es2016 */
gulp.task('scripts', () => {
    return gulp.src('src/js/app.js')
      .pipe(babel({
        presets: ['babel-preset-env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js/'));
});

gulp.task('clean-scripts', () => {
    return del([
        'dist/js/app.js'
    ]);
});

gulp.task('clean-sass', () => {
  return del([
      'dist/css/app.css'
  ]);
});

gulp.task('minify-css', () => {
  return gulp.src('dist/app.css')
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', function () {
  gulp.src('dist/app.js')
      .pipe(jsmin())
      .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series(['clean-sass', 'clean-scripts', 'sass', 'scripts']));

gulp.task('watch', function(done){
    gulp.watch('src/sass/**/*.scss', gulp.series(['clean-sass', 'sass']) )
    gulp.watch('src/js/**/*.js', gulp.series(['clean-scripts', 'scripts']) )
    done();
})

gulp.task('production', function(done){
  gulp.watch('src/sass/**/*.scss', gulp.series(['clean-sass', 'sass', 'minify-css']) )
  gulp.watch('src/js/**/*.js', gulp.series(['clean-scripts', 'scripts', 'minify-js']) )
  done();
})