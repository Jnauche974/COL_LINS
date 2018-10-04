import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export const SocketInstance = socketio('http://localhost:3000');

Vue.use(VueSocketIO, SocketInstance)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
