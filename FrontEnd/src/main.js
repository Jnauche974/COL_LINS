import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import config from '../configuration/config';

export const SocketInstance = socketio(config.host);

Vue.use(VueSocketIO, SocketInstance);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
