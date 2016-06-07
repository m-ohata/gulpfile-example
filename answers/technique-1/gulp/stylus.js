var gulp = require("gulp");
var gulpPlumber = require("gulp-plumber");
var gulpNotify = require("gulp-notify");
var gulpCached = require("gulp-cached");
var gulpUsing = require("gulp-using");
var gulpStylus = require("gulp-stylus");
var koutoSwiss = require("kouto-swiss");

var paths = {
  app: {
    src: [
      "./src/stylesheets/**/*.styl",
      "!./src/stylesheets/preview/*.styl",
      "!./src/stylesheets/report/*.styl"
    ],
    dest: "./dist/css/app/"
  },
  preview: {
    src: [
      "./src/stylesheets/preview/**/*.styl"
    ],
    dest: "./dist/css/preview/"
  },
  report: {
    src: [
      "./src/stylesheets/report/**/*.styl"
    ],
    dest: "./dist/css/report/"
  }
};
["app", "preview", "report"].forEach(function(key){
  var src = paths[key].src,
      dest = paths[key].dest,
      basedir = paths[key].basedir;
  gulp.task("stylus:"+key, function(){
    gulp
      .src(src)
      .pipe(gulpPlumber({
        errorHandler: gulpNotify.onError("<%= error.message %>")
      }))
      .pipe(gulpCached("stylus:"+key))
      .pipe(gulpUsing())
      .pipe(gulpStylus({
        compress: false,
        use: koutoSwiss()
      }))
      .pipe(gulp.dest(dest));
  });
});
gulp.task("stylus", ["stylus:app", "stylus:preview", "stylus:report"]);

