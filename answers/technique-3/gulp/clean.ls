require! <[gulp rimraf]>

gulp.task \clean, ->
  <[tmp dist]>
  |> each rimraf.sync

