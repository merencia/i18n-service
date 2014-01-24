module.exports = function(app) {
  var service = app.controllers.service;
  app.get('/:locale', service.translate);
  app.post('/:locale', service.translate);
};
