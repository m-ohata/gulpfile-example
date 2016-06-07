require! <[gulp run-sequence]>

gulp.task \build, (cb)->
  run-sequence do
    \clean
    <[coffee livescript]>
    <[jade stylus]>
    cb

