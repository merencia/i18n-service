
var express = require('express')
  , load    = require('express-load')
  , fs      = require('fs') 
  , app     = express()

app.set('port', process.env.PORT || 3000)
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(app.router)

load('models')
  .then('controllers')
  .then('routes')
  .into(app)


localesFolder = __dirname + '/locales/'

app.locales = {}

fs.readdir(localesFolder, function (err, files) {
  console.log('loadding locales...')
  if(!err) {
    files.forEach(function(file){
      locale = require( localesFolder + file )
      for ( key in locale ){
        app.locales[key] = locale[key]
      }
    })
    console.log("locales loaded!")
  }else{
    throw err
  }
})

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
