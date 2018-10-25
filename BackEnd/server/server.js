'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    // Use this with user authentification
    // require('socketio-auth')(app.io, {
      // authenticate: function (socket, value, callback) {

      //     var AccessToken = app.models.AccessToken;
      //     //get credentials sent by the client
      //     var token = AccessToken.find({
      //       where:{
      //         and: [{ userId: value.userId }, { id: value.id }]
      //       }
      //     }, function(err, tokenDetail){
      //       if (err) throw err;
      //       if(tokenDetail.length){
      //         callback(null, true);
      //       } else {
      //         callback(null, false);
      //       }
      //     }); //find function..
      //   } //authenticate function..
    // });
    app.subscribers = [];
    app.io.on('connection', function(socket) {
      console.info('client connected');
      socket.on('disconnect', function() {
        console.info('client disconnected');
      });
      socket.on('subscribe', function(payload) {
        const topic = payload.toString();
        if (!app.subscribers[topic]) {
          app.subscribers[topic] = [];
        }
        const isAlreadySub = app.subscribers[topic]
          .some((soc) => { return soc.id === socket.id; });
        if (!isAlreadySub) {
          app.subscribers[topic].push(socket);
          app.mqttClient.subscribe(topic);
        }
      });

      socket.on('submitMessage', function(msg, topicId) {
        let record =  [{Date: new Date(Date.now()), Message: msg, topicId}];
        app.models.Message.create(record, (error) => {
          if (error) console.error(error);
        });
      });
    });
  }
});
