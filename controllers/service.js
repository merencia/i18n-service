module.exports = function(app) {
 /**
  * Resolves literals passed as parameter
  *
  * @param <Object> request
  *
  * @return <Array> a array with literals  
  */
  var getLiterals = function(req){
    literals = req.body.l || req.query.l
    if (literals)
      return Array.isArray(literals) ? literals : literals.split(',');
    else
      return [];
  }

 /**
  * Translata a array of literals
  *
  * @param <Array> literals to translate
  * @param <Object> a object with literals and translations
  *
  * @return <Object> a object with translations
  */
  var translate = function(literals, locale){
    translated = {};

    if (literals.length > 0){
      for (i in literals) {
        literal = literals[i];
        translated[literal] = find(literal, locale);
      }
    }else{
       translated = locale;
    }
    return translated;
  }

 /**
  * Find a literal in locale object
  * 
  * @param <String> literal 
  * @param <Object> a object with literals and translations
  *
  * @return <Object> a object with translations
  */
  var find = function(literal, locale){
    index = literal.indexOf('.');
    if(index != -1){
      parent = literal.substring(0, index);
      return find(literal.substring(index + 1), locale[parent]);
    }else {
      return locale[literal];
    }
  }

  var ServiceController = {
    translate: function(req, res) {

      localeName = req.params.locale;
      if(app.locales.hasOwnProperty(localeName)){
        locale = app.locales[localeName];

        literals = getLiterals(req);
        translated = translate(literals, locale);

        contentType = {"Content-Type": "application/json; charset=utf-8"};

        res.writeHead(200, contentType);
        res.write(JSON.stringify(translated), 'utf8');
      }else {
        res.writeHead(404, contentType);
        res.write("locale not found!");
      }
      res.end();
    }
  };
  return ServiceController;
};
