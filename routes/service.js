module.exports = function(app) {
  var service = app.controllers.service
  app.get('/:locale/translate', service.translate)
  app.post('/:locale/translate', service.translate)
};
