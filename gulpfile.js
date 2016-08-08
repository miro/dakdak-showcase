const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const livereload   = require('gulp-livereload');
const del          = require('del');


gulp.task('clean', callback => {
  del(['dist/**'], callback);
});

gulp.task('sass', () => {
  gulp.src('./src/styles/*.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(autoprefixer())
    .pipe(livereload())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('./src/styles/*.scss', ['sass'], () => livereload.reload());
});


// NOTE: untested
gulp.task('build', ['clean'], () => {
  gulp.src(['index.html', './js/**', './css/**', './fonts/**', './img/**'], { base: './app' })
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['sass', 'watch'], () => {});
