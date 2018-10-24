'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://localhost:1883");

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
    /*require('socketio-auth')(app.io, {
      authenticate: function (socket, value, callback) {
  
          var AccessToken = app.models.AccessToken;
          //get credentials sent by the client
          var token = AccessToken.find({
            where:{
              and: [{ userId: value.userId }, { id: value.id }]
            }
          }, function(err, tokenDetail){
            if (err) throw err;
            if(tokenDetail.length){
              callback(null, true);
            } else {
              callback(null, false);
            }
          }); //find function..    
        } //authenticate function..
    });*/
  
    app.io.on('connection', function(socket){
      console.info('a user connected');
      socket.on('disconnect', function(){
          console.info('user disconnected');
      });
      socket.on('submitMessage', function(msg, topic) {
        socket.emit('submitMessage', msg);
        let record =  [{Date: new Date(Date.now()),Message: msg, topicId: topic}];
        app.models.Message.create(record, (error) => {if (error) console.error(error);}); 
        //socket.broadcast.emit('submitMessage', msg);
        // Publish message in Topic
        client.publish(topic, msg);
        console.log(topic +' : '+ msg);
        //socket.emit('publishMessageTopic', topic, msg);
      });
      socket.on('subscribeTopic', function(topic) {
        client.subscribe(topic);
        console.log('Je souscris à ' + topic);
      });
    });
    /*client.on('connect', function () {
      client.subscribe('myTopic');
      console.log('Je souscris à myTopic');
      client.publish('myTopic', 'Hello mqtt');
    })*/
    /*client.on('message', function (topic, msg2) {
      console.log(msg2.toString())
    })*/
  }
});
