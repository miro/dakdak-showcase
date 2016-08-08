const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const runSequence  = require('run-sequence');
const livereload   = require('gulp-livereload');
const del          = require('del');


gulp.task('clean', callback => {
  del(['dist/**'], callback);
});

gulp.task('sass', () => {
  gulp.src('./src/styles/**/*.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(autoprefixer())
    .pipe(livereload())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('./src/styles/*.scss', ['sass'], () => livereload.reload());
  gulp.watch('./src/views/**/*', () => livereload.reload());
});

gulp.task('copyAssets', () => {
  gulp.src(['./assets/**'])
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'copyAssets', 'sass'], (callback) => {
  runSequence(
    'clean',
    'copyAssets',
    'sass',
    callback
  );
  // gulp.src(['./assets/**'], { base: './app' })
  //   .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build', 'watch']);
