var gulp = require("gulp");
var gulpPlumber = require("gulp-plumber");
var gulpNotify = require("gulp-notify");
var gulpCached = require("gulp-cached");
var gulpUsing = require("gulp-using");
var gulpCoffee = require("gulp-coffee");

gulp.task("coffee", function(){
  gulp
    .src("src/scripts/**/*.coffee")
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError("<%= error.message %>")
    }))
    .pipe(gulpCached("coffee"))
    .pipe(gulpUsing())
    .pipe(gulpCoffee({bare: true}))
    .pipe(gulp.dest("./dist/scripts/"));
});

