var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var connect = require('gulp-connect');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('copy-index-html', function() {
    gulp.src('./index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/'));
});

// gulp.task('copy-full-list-html', function() {
//     gulp.src('./full-list.html')
//     // Perform minification tasks, etc here
//     .pipe(gulp.dest('./dist/'));
// });

gulp.task('copy-simulator-html', function() {
    gulp.src('./simulator.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-lib-files', function() {
    gulp.src('./lib/2018/*.json')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/lib/2018'));
});


gulp.task('connect', function () {
  connect.server({
    root: '',
    port: 8888
  });
});

gulp.task('connectDist', function () {
  connect.server({
    root: './dist/',
    port: 9999
  });
});

gulp.task('styles', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('compile-js', function() {
  return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest("dist/js"));
})

gulp.task("default", function () {
  ['copy-lib-files', 'copy-index-html', 'copy-simulator-html',
  'compile-js', 'connectDist', 'browserSync'], function(){
    gulp.watch('./scss/**/*.scss', ['styles']);
  }
});
