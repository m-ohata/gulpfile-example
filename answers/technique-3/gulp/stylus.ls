require! <[gulp gulp-plumber gulp-notify gulp-cached gulp-using gulp-stylus kouto-swiss]>

paths =
  app:
    src: <[
      ./src/stylesheets/**/*.styl
      !./src/stylesheets/preview/*.styl
      !./src/stylesheets/report/*.styl
    ]>
    dest: "./dist/css/app/"
  preview:
    src: <[
      ./src/stylesheets/preview/**/*.styl
    ]>
    dest: "./dist/css/preview/"
  report:
    src: <[
      ./src/stylesheets/report/**/*.styl
    ]>
    dest: "./dist/css/report/"

paths
|> obj-to-pairs
|> each ([key, {src, dest, basedir}])->
  gulp.task "stylus:#key", ->
    gulp
      .src src
      .pipe gulp-plumber do
        error-handler: gulp-notify.on-error "<%= error.message %>"
      .pipe gulp-cached "stylus:#key"
      .pipe gulp-using!
      .pipe gulp-stylus do
        compress: no
        use: kouto-swiss!
      .pipe gulp.dest dest
|> map head >> ("stylus:" +)
|> gulp.task \stylus, _

