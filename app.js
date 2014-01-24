
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


localesFolder = process.env.LOCALES_FOLDER || __dirname + '/locales/'

console.log("> Locales foder: " + localesFolder)

app.locales = {}
localesFiles = fs.readdirSync(localesFolder)
console.log('--> loadding locales: ' + localesFiles)
for(i in localesFiles){
  file = localesFiles[i]
  locale = require( localesFolder + file )
  for ( key in locale ){
    app.locales[key] = locale[key]
  }
}

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app
