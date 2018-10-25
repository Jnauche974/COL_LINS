module.exports = function(app) {
    app.dataSources.db.automigrate(['Type', 'Topic', 'Message'], function(err) {
      if (err) throw err;
  
      app.models.Type.create([{
        Name: 'Public'
      }, {
        Name: 'Prive'
      }], function(err, type) {
        if (err) throw err;
  
        console.log('Models created: \n', type);
      });

      app.models.Topic.create([{
        Name: 'Mon premier Topic',
        Close: false,
        typeId: '1'
      },{
        Name: 'Mon deuxième Topic',
        Close: false,
        typeId: '2' 
      }], function(err, topic) {
        if (err) throw err;
  
        console.log('Models created: \n', topic);
      });

      app.models.Message.create([{
        Date: new Date(Date.now()),
        Message: 'Bienvenue sur notre premier Topic!',
        clientId: '0',
        topicId: '1'
      }, {
        Date: new Date(Date.now()),
        Message: 'Bienvenue sur notre deuxième Topic!',
        clientId: '0',
        topicId: '2'  
      }], function(err, message) {
        if (err) throw err;
  
        console.log('Models created: \n', message);
      });

    });
  };