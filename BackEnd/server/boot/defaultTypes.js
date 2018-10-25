'use strict';

module.exports = function enableAuthentication(app) {
  const Type = app.models.Type;
  Type.create({Name: 'public'}, function(err, type) {
    if (err) throw err;
    console.info('default type created:', type);
  });
};
