var gulp = require("gulp");
var runSequence = require("run-sequence");
var gulpNotify = require("gulp-notify");
var gulpPlumber = require("gulp-plumber");
var gulpUsing = require("gulp-using");
var gulpCached = require("gulp-cached");
var gulpPlumber = require("gulp-plumber");
var gulpJade = require("gulp-jade");
var gulpCoffee = require("gulp-coffee");
var gulpLivescript = require("gulp-livescript");
var gulpStylus = require("gulp-stylus");
var koutoSwiss = require("kouto-swiss");
var rimraf = require("rimraf");
var gulpUtil = require("gulp-util");
var colors = require("colors");

// clean
gulp.task("clean", function(){
  ["tmp", "dist"].forEach(function(it){
    rimraf.sync(it);
  });
});

// jade
var jadePaths = {
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
  var src = jadePaths[key].src,
      dest = jadePaths[key].dest,
      basedir = jadePaths[key].basedir;
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

// stylus
var stylusPaths = {
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
  var src = stylusPaths[key].src,
      dest = stylusPaths[key].dest,
      basedir = stylusPaths[key].basedir;
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

// coffee-script
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

// live-script
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

// build
gulp.task("build", function(cb){
  runSequence(
    "clean",
    ["coffee", "livescript"],
    ["jade", "stylus"],
    cb
  );
});

// watch
var watchOptions = {interval: 500}
gulp.task("watch", function(cb){
  gulp.watch(
    "./src/scripts/**/*.coffee",
    watchOptions,
    function(){
      console.log("Changed App CoffeeScript".green);
      runSequence("coffee");
    }
  );
  gulp.watch(
    "./src/scripts/**/*.ls",
    watchOptions,
    function(){
      console.log("Changed App LiveScript".green);
      runSequence("livescript");
    }
  );
  gulp.watch(
    [
      "./src/templates/**/*.jade",
      "!./src/templates/preview/**/*.jade",
      "!./src/templates/report/**/*.jade"
    ],
    watchOptions,
    function(){
      console.log("Changed App Jade".green);
      runSequence("jade:app");
    }
  );
  gulp.watch(
    "./src/templates/preview/**/*.jade",
    watchOptions,
    function(){
      console.log("Changed Preview Jade".green);
      runSequence("jade:preview");
    }
  );
  gulp.watch(
    "./src/templates/report/**/*.jade",
    watchOptions,
    function(){
      console.log("Changed Report Jade".green);
      runSequence("jade:report");
    }
  );
  gulp.watch(
    [
      "./src/stylesheets/**/*.styl",
      "!./src/stylesheets/preview/**/*.styl",
      "!./src/stylesheets/report/**/*.styl"
    ],
    watchOptions,
    function(){
      console.log("Changed App Stylus".green);
      runSequence("stylus:app");
    }
  );
  gulp.watch(
    "./src/stylesheets/preview/**/*.styl",
    watchOptions,
    function(){
      console.log("Changed Preview Stylus".green);
      runSequence("stylus:preview");
    }
  );
  gulp.watch(
    "./src/stylesheets/report/**/*.styl",
    watchOptions,
    function(){
      console.log("Changed Report Stylus".green);
      runSequence("stylus:report");
    }
  );
});

// default
gulp.task("default", function(cb){
  runSequence("build", "watch", cb);
});

