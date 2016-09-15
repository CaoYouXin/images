var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglifyJs = require('gulp-uglify');
var rename = require('gulp-rename');

var __devSrc = './__dev/';
var dst = './build/';

function jsDefault(src, dst) {
    gulp.src(src)
        .pipe(uglifyJs())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest(dst));
}

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('b-ps', function() {
    var jsSrc = __devSrc + 'pageslider/*.js';
    var cssSrc = __devSrc + 'pageslider/*.css';
    var psDst = dst + 'pageslider/';

    jsDefault(jsSrc, psDst);

    gulp.src(cssSrc)
        .pipe(minifyCss())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest(psDst));
});

gulp.task('b-3d', function () {
    var jsSrc = __devSrc + '3d/*.js';
    var _3dDst = dst + '3d/';

    jsDefault(jsSrc, _3dDst);
});
