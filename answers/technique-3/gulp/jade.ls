require! <[gulp gulp-cached gulp-using gulp-plumber gulp-jade]>

paths =
  app:
    src: <[
      ./src/templates/**/*.jade
      "!./src/templates/preview/**/*.jade
      "!./src/templates/report/**/*.jade
    ]>
    dest: "./dist/html/app/"
    basedir: "./src/templates/"
  preview:
    src: <[
      ./src/templates/preview/**/*.jade
    ]>
    dest: "./dist/html/preview/"
    basedir: "./src/templates/preview/"
  report:
    src: <[
      ./src/templates/report/**/*.jade
    ]>
    dest: "./dist/html/report/"
    basedir: "./src/templates/report/"

paths
|> obj-to-pairs
|> each ([key, {src, dest, basedir}])->
  gulp.task "jade:#key", ->
    gulp
      .src src
      .pipe gulp-cached "jade:#key"
      .pipe gulp-using!
      .pipe gulp-plumber!
      .pipe gulp-jade do
        basedir: basedir
        pretty: yes
      .pipe gulp.dest dest
|> map head >> ("jade:" +)
|> gulp.task \jade, _

