var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglifyJs = require('gulp-uglify');
var rename = require('gulp-rename');

var __devSrc = './__dev/';
var dst = './build/';

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('b-ps', function() {
    var jsSrc = __devSrc + 'pageslider/*.js';
    var cssSrc = __devSrc + 'pageslider/*.css';
    var psDst = dst + 'pageslider/';

    gulp.src(jsSrc)
        .pipe(uglifyJs())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest(psDst));

    gulp.src(cssSrc)
        .pipe(minifyCss())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest(psDst));
});
