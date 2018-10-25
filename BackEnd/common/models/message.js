'use strict';

module.exports = function(Message) {
  // Order after save..
  Message.observe('after save', function(ctx, next) {
    var mqttClient = Message.app.mqttClient;
    var message = ctx.instance;
    mqttClient.publish(`topic/${message.topicId}`, JSON.stringify(message));
    // Calling the next middleware..
    next();
  }); // after save..
};
