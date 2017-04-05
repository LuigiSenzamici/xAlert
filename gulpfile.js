var gulp = require('gulp');
var doc = require('gulp-documentation');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var source = 'xAlert.js';
var path = './src/';
var origin = path + source;
var destHTMLDoc = './doc/HTML_doc';
var destAPIDoc = './doc/MD_API_doc';
var dest = './dist/';
var styleOrigin = path + 'xAlert.styl';
var styleDest = dest;
gulp.task('doc:html', function () {
    return gulp.src(origin)
      .pipe(doc('html'))
      .pipe(gulp.dest(destHTMLDoc));
});
gulp.task('doc:readme', function () {
    return gulp.src(origin)
      .pipe(doc('md'))
      .pipe(gulp.dest(destAPIDoc));
});
gulp.task('doc', ['doc:html', 'doc:readme']);

gulp.task('compile:js', function(){
    return gulp.src(origin)
        .pipe(uglify())
        .pipe(gulp.dest(dest));
});
gulp.task('compile:style', function(){
    return gulp.src(styleOrigin)
        .pipe(stylus())
        .pipe(gulp.dest(styleDest));
});
gulp.task('compile', ['compile:js', 'compile:style']);
