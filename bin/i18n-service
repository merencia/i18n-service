#!/usr/bin/env node

var express = require('express'),
    load    = require('express-load'), 
    fs      = require('fs'), 
    app     = express()

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);

load('controllers')
  .then('routes')
  .into(app);

if (process.env.LOCALES_FOLDER){
  localesFolder = process.env.LOCALES_FOLDER;

  console.log("> Locales foder: " + localesFolder);

  app.locales = {};
  localesFiles = fs.readdirSync(localesFolder);
  console.log('--> loadding locales: ' + localesFiles);
  for( var i in localesFiles ){
    file = localesFiles[i];
    locale = require( localesFolder + file );
    for ( var key in locale ){
      app.locales[key] = locale[key];
    }
  }
  
  app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

  module.exports = app;
}else{
  throw "LOCALES_FOLDER not defined."
}


