require! <[gulp run-sequence]>

gulp.task \default, (cb)->
  run-sequence \build, \watch, cb

