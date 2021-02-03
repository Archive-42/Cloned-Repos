var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var babelify = require('babelify');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');

gulp.task('lintJs', function () {

    gulp.src(['js/**/*.js'])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('buildCSS', function () {
    gulp.src('sass/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('public'));
});

gulp.task('buildJS', function () {

    var bundler = browserify();

    bundler.add('js/main.js');

    bundler.transform(reactify);
    bundler.transform(babelify);

    bundler.bundle()
        .pipe(source('app.js'))
        .pipe(plumber())
        .pipe(gulp.dest('public'));

});

gulp.task('default', function () {
    gulp.watch('sass/**/*.scss', ['buildCSS']);
    gulp.watch('js/**/*.js', ['buildJS'])
});