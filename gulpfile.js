// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


// tasks
gulp.task('lint', function() {
  gulp.src(['./js/*.js', '!./bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./css/*.css', '!./bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/css/'))
});

gulp.task('minify-js', function() {
  gulp.src(['./js/*.js', '!./bower_components/**'])
    .pipe(uglify().on('error', function(e){ console.log(e); }))
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('copy-bower-components', function () {
  gulp.src('./bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});

// not using partials here
// gulp.task('copy-partials-files', function () {
//   gulp.src('./partials/*.html')
//     .pipe(gulp.dest('./dist/partials/'));
// });

gulp.task('copy-index-html', function() {
    gulp.src('./index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-full-list-html', function() {
    gulp.src('./full-list.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-simulator-html', function() {
    gulp.src('./simulator.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-lib-files', function() {
    gulp.src('./lib/2017/*.json')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/lib/'));
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
    gulp.src('./sass/**/*.scss')
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


// default task
gulp.task('default',
  [ 'connect', 'browserSync'], function(){
    gulp.watch('./sass/**/*.scss', ['styles']);
    gulp.watch('./partials/*.html', browserSync.reload);
    gulp.watch('./js/*.js', browserSync.reload);
  }
);

gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['minify-css', 'minify-js', 'copy-index-html', 'copy-full-list-html', 'copy-simulator-html', 'copy-lib-files']
  );
});
