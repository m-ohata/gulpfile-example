require! <[gulp run-sequence colors]>

options = interval: 500
targets =
  * src: "./src/scripts/**/*.coffee"
    message: "Changed App CoffeeScript"
    tasks: <[coffee]>
  * src: "./src/scripts/**/*.ls"
    message: "Changed App LiveScript"
    tasks: <[livescript]>
  * src: <[
      ./src/templates/**/*.jade
      !./src/templates/preview/**/*.jade
      !./src/templates/report/**/*.jade
    ]>
    message: "Changed App Jade"
    tasks: <[jade:app]>
  * src: "./src/templates/preview/**/*.jade"
    message: "Changed Preview Jade"
    tasks: <[jade:preview]>
  * src: "./src/templates/report/**/*.jade"
    message: "Changed Report Jade"
    tasks: <[jade:report]>
  * src: <[
      ./src/stylesheets/**/*.styl
      !./src/stylesheets/preview/**/*.styl
      !./src/stylesheets/report/**/*.styl
    ]>
    message: "Changed App Stylus"
    tasks: <[stylus:app]>
  * src: "./src/stylesheets/preview/**/*.styl"
    message: "Changed Preview Stylus"
    tasks: <[stylus:preview]>
  * src: "./src/stylesheets/report/**/*.styl"
    message: "Changed Report Stylus"
    tasks: <[stylus:report]>

gulp.task \watch, (cb)->
  targets
  |> each ({src, message, tasks})->
    gulp.watch src, options, ->
      console.log message.green
      tasks |> apply run-sequence

