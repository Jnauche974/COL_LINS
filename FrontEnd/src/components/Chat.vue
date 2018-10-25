<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column fill-height>
        <div id="messageChat">
          <ul v-for="msg of messages">
            <li>
              <span>Username</span>
              <p><strong>{{msg.text}}</strong></p>
              <p>{{msg.Date}}</p>
            </li>
          </ul>
        </div>
        <v-layout column align-center>
          <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        </v-layout>
        <v-layout column align-center>
              <v-form id="form" ref="form" v-model="valid" lazy-validation>
                <v-textarea
                  v-model="message"
                  box
                  :rules="messageRules"
                  :counter="200"
                  label="Message"
                  required
                ></v-textarea>
                
                <v-btn
                  :disabled="!valid"
                  v-on:click="submit"
                >
                  Envoyer
                </v-btn>
                <v-btn v-on:click="clear">Effacer</v-btn>
              </v-form>
          </v-layout>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
  
</template>

<script>
import axios from 'axios';
import settings from '../../appSettings'
import {EventBus } from './event-bus.js';

var decoder = new TextDecoder("utf-8");

  export default {
    data: () => ({
      valid: true,
      message: '',
      messages:[],
      topic: 0,
      messageRules: [
        v => !!v || 'Message is required',
        v => (v && v.length <= 200) || 'Message must be less than 200 characters'
      ]
    }),

    sockets: {
      connect() {
        //Send a message when user connected
        console.info('connected on chat serveur');
      },
    },
    mounted() {
      EventBus.$on('topic-selected', (topicSelected)=> {
        if(this.topic !== topicSelected && this.topic > 0) {
          delete this.$options.sockets[this.topic]
          this.$socket.emit('unsubscribe', `topic/${this.topic}`);
        }

        this.topic = topicSelected;
        this.$socket.emit('subscribe', `topic/${topicSelected}`);
        this.$options.sockets[`topic/${topicSelected}`] = this.onMessageReceived;

        this.getMessages();
      });
    },
    methods: {
      onMessageReceived: function (message) {
        console.info(`new message received : ${decoder.decode(message)}`);
        this.messages.push(JSON.parse(decoder.decode(message)));
      },
      submit () {
        if (this.$refs.form.validate()) {
          // Get the message and sent to the serveur
          axios.post(`${settings.BaseURL}${settings.Api.MESSAGES}`, {
            text: this.message,
            topicId: this.topic,
            Date: new Date(),
          }).then(() => {
            this.message = '';
            this.clear();
          })
        }
      },

      getMessages () {
        axios.get(`${settings.BaseURL}${settings.Api.TOPICS}${this.topic}/messages?time=${Date.now()}`)
          .then(response => {
            this.messages = response.data
          })
          .catch(e => {
            // eslint-disable-next-line
            console.error(e)
          });
      },

      clear () {
        this.$refs.form.reset()
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {list-style-type: none;}
ul:nth-child(even) {background-color: #f2f2f2;}
#form {position: fixed; bottom: 30px; }
</style>
