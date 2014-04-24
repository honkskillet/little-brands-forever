var Gulp=require("gulp");

//package for minifing and concatinating
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var paths = {
//  scripts: ['dev/bower_components/underscore/underscore.js','dev/bower_components/jquery/dist/jquery.min.js','dev/bower_components/snap.svg/dist/snap.svg-min.js','dev/js/main.js'],
//  styleSheets: ['bower_components/Font-Awesome/css/font-awesome.css'],
//  svgs: ['dev/svg/*.svg'],
  
  svgPaths: ['dev/bower_components/Font-Awesome/fonts/fontawesome-webfont.svg'],
};

//gulp.task('scripts', function() {
//  // Minify and copy all JavaScript (except vendor scripts)
//  return gulp.src(paths.scripts)
//    .pipe(uglify())
//    .pipe(concat('att.min.js'))
//    .pipe(gulp.dest('build/js'));
//});
//
//gulp.task('css', function() {
//  // Minify and copy all JavaScript (except vendor scripts)
//  return gulp.src(paths.styleSheets)
//    .pipe(concat('att.min.css'))
//    .pipe(minifyCSS())
//    .pipe(gulp.dest('build/css'));
//});

//gulp.task('svgPaths', function() {
//  return gulp.src(paths.svgPaths)
//    .pipe(gulp.dest('dev/svgPaths.txt'));
//});


// Rerun the task when a file changes
gulp.task('watch', function () {
//  gulp.watch(paths.scripts, ['scripts']) ;
//  gulp.watch(paths.styleSheets, ['css']) ;
  gulp.watch(['gulpfile.js'], ['default']) ;
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [/*'scripts', 'css','svg','txt','fonts'*/'svgPaths','watch']);//
