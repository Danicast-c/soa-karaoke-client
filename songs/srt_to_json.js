// import parseSRT from 'parse-srt'
// 'convert.process("./juangabriel.srt","./juanga.json")'
var parseSRT = require('parse-srt')
var fs = require('fs');
var jsonSubs
fs.readFile( 'comolaflor.srt','utf8', function (err, f){
  if(err) throw err;
  //console.log(f)
  jsonSubs = parseSRT(f.toString())
  console.log(jsonSubs)
} )
