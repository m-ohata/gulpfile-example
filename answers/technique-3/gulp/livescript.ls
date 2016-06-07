require! <[gulp gulp-plumber gulp-notify gulp-cached gulp-using gulp-livescript]>

gulp.task \livescript, ->
  gulp
    .src "./src/scripts/**/*.ls"
    .pipe gulp-plumber do
      error-handler: gulp-notify.on-error "<%= error.message %>"
    .pipe gulp-cached \livescript
    .pipe gulp-using!
    .pipe gulp-livescript {bare: yes}
    .pipe gulp.dest "./dist/scripts/"

