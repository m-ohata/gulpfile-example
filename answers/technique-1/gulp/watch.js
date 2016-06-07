var gulp = require("gulp");
var runSequence = require("run-sequence");
var colors = require("colors");

var options = {interval: 500}
gulp.task("watch", function(cb){
  gulp.watch(
    "./src/scripts/**/*.coffee",
    options,
    function(){
      console.log("Changed App CoffeeScript".green);
      runSequence("coffee");
    }
  );
  gulp.watch(
    "./src/scripts/**/*.ls",
    options,
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
    options,
    function(){
      console.log("Changed App Jade".green);
      runSequence("jade:app");
    }
  );
  gulp.watch(
    "./src/templates/preview/**/*.jade",
    options,
    function(){
      console.log("Changed Preview Jade".green);
      runSequence("jade:preview");
    }
  );
  gulp.watch(
    "./src/templates/report/**/*.jade",
    options,
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
    options,
    function(){
      console.log("Changed App Stylus".green);
      runSequence("stylus:app");
    }
  );
  gulp.watch(
    "./src/stylesheets/preview/**/*.styl",
    options,
    function(){
      console.log("Changed Preview Stylus".green);
      runSequence("stylus:preview");
    }
  );
  gulp.watch(
    "./src/stylesheets/report/**/*.styl",
    options,
    function(){
      console.log("Changed Report Stylus".green);
      runSequence("stylus:report");
    }
  );
});

