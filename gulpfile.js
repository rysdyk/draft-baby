var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var connect = require('gulp-connect');
var sass = require('gulp-sass');
var livereload = livereload = require('gulp-livereload');

gulp.task('copy-index-html', function() {
    gulp.src('./index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/'));
});

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
        //.pipe(browserSync.reload({stream: true}));
});

gulp.task('typescript', function() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist/js"));
})


gulp.task("watch", function () {
  ['typescript', 'styles'], function(){
    gulp.watch('./**/*.ts', ['typescript']);
    gulp.watch('./scss/**/*.scss', ['styles']);

    livereload.listen();
  }
});

gulp.task("default", ['copy-index-html', 'copy-simulator-html', 'copy-lib-files',
                      "styles", "typescript", "connectDist", "watch"]);
