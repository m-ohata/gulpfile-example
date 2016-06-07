require! <[gulp gulp-plumber gulp-notify gulp-cached gulp-using gulp-coffee]>

gulp.task \coffee, ->
  gulp
    .src "src/scripts/**/*.coffee"
    .pipe gulp-plumber do
      error-handler: gulp-notify.on-error "<%= error.message %>"
    .pipe gulp-cached \coffee
    .pipe gulp-using!
    .pipe gulp-coffee {bare: yes}
    .pipe gulp.dest "./dist/scripts/"

