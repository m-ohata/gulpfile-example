var gulp = require("gulp");
var gulpCached = require("gulp-cached");
var gulpUsing = require("gulp-using");
var gulpPlumber = require("gulp-plumber");
var gulpJade = require("gulp-jade");

var paths = {
  app: {
    src: [
      "./src/templates/**/*.jade",
      "!./src/templates/preview/**/*.jade",
      "!./src/templates/report/**/*.jade"
    ],
    dest: "./dist/html/app/",
    basedir: "./src/templates/"
  },
  preview: {
    src: [
      "./src/templates/preview/**/*.jade"
    ],
    dest: "./dist/html/preview/",
    basedir: "./src/templates/preview/"
  },
  report: {
    src: [
      "./src/templates/report/**/*.jade"
    ],
    dest: "./dist/html/report/",
    basedir: "./src/templates/report/"
  }
};
["app", "preview", "report"].forEach(function(key){
  var src = paths[key].src,
      dest = paths[key].dest,
      basedir = paths[key].basedir;
  gulp.task("jade:"+key, function(){
    gulp
      .src(src)
      .pipe(gulpCached("jade:"+key))
      .pipe(gulpUsing())
      .pipe(gulpPlumber())
      .pipe(gulpJade({
        basedir: basedir,
        pretty: true
      }))
      .pipe(gulp.dest(dest));
  });
});
gulp.task("jade", ["jade:app", "jade:preview", "jade:report"]);

