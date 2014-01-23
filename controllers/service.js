module.exports = function(app) {

  var getLiterals = function(req){
    literals = req.body.literals || req.query.literals
    if (literals)
      return literals.split(',')
  }

  var translate = function(literals, locale){
    translated = {}

    for (i in literals) {
      literal = literals[i]
      translated[literal] = find(literal, locale)
    }

    return translated
  }

  var find = function(literal, locale){
    index = literal.indexOf('.')
    if(index != -1){
      parent = literal.substring(0, index)
      return find(literal.substring(index), locale[parent])
    }else {
      return locale[literal]
    }
  }

  var ServiceController = {
    translate: function(req, res) {
      
      localeName = req.params.locale
      locale = app.locales[localeName]

      literals = getLiterals(req)
      if (literals){
        translated = translate(literals, locale)
      } else {
        translated = locale
      }

      contentType = {"Content-Type": "application/json; charset=utf-8"}

      if(translated){
        res.writeHead(200, contentType)
        res.write(JSON.stringify(translated), 'utf8')
      }else {
        res.writeHead(404, contentType);
        res.write("locale not found!")
      }
      res.end()
    }
  };
  return ServiceController;
};
