var fs = require("fs");

fs
  .readdirSync(__dirname+"/gulp")
  .filter(function(it){
    return it.match(/\.js$/);
  })
  .forEach(function(it){
    require("./gulp/"+it);
  });

