var gulp = require("gulp");
var runSequence = require("run-sequence");

gulp.task("build", function(cb){
  runSequence(
    "clean",
    ["coffee", "livescript"],
    ["jade", "stylus"],
    cb
  );
});

