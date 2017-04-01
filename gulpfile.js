var gulp = require('gulp');
var doc = require('gulp-documentation');

gulp.task('doc:html', function () {
    return gulp.src('./underscore-selector.js')
      .pipe(doc('html'))
      .pipe(gulp.dest('./HTML_doc'));
});
gulp.task('doc:readme', function () {
    return gulp.src('./underscore-selector.js')
      .pipe(doc('md'))
      .pipe(gulp.dest('./MD_API_doc'));
});
gulp.task('doc', ['doc:html', 'doc:readme']);
