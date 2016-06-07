var gulp = require("gulp");
var rimraf = require("rimraf");

gulp.task("clean", function(){
  ["tmp", "dist"].forEach(function(it){
    rimraf.sync(it);
  });
});

