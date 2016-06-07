require! \fs
global <<< require \prelude-ls

"#__dirname/gulp"
|> fs.readdir-sync
|> filter (is /\.ls$/)
|> map ("./gulp/" +)
|> each require

