var gulp = require("gulp");
var gulpPlumber = require("gulp-plumber");
var gulpNotify = require("gulp-notify");
var gulpCached = require("gulp-cached");
var gulpUsing = require("gulp-using");
var gulpLivescript = require("gulp-livescript");

gulp.task("livescript", function(){
  gulp
    .src("./src/scripts/**/*.ls")
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError("<%= error.message %>")
    }))
    .pipe(gulpCached("livescript"))
    .pipe(gulpUsing())
    .pipe(gulpLivescript({bare: true}))
    .pipe(gulp.dest("./dist/scripts/"));
});

