["clean", "jade", "stylus", "coffee", "livescript", "build", "watch", "default"]
.forEach(function(it){
  require("./gulp/"+it+".js");
});

