<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <div id="messageChat">
           <ul v-for="msg of messages">
              <li>
                 <p><strong>{{msg.Message}}</strong></p>
                 <p>{{msg.Date}}</p>
              </li>
           </ul>
        </div>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <div>
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
          </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
  
</template>

<script>
import axios from 'axios';

  export default {
    data: () => ({
      valid: true,
      message: '',
      messages:[],
      messageRules: [
        v => !!v || 'Message is required',
        v => (v && v.length <= 200) || 'Message must be less than 200 characters'
      ]
    }),

    sockets: {
      connect() {
        this.getMessages();
        //Send a message when user connected
      },

      disconnect() {
        // Send a message when user disconnected
      },
      
      // eslint-disable-next-line
      submitMessage (message) {
        this.getMessages();
      }
    },

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Get the message and sent to the serveur
          this.$socket.emit('submitMessage', this.message);
          this.message = '';
        }
      },
      
      getMessages () {
        // Todo request from Topics/{id}/messages
        axios.get('http://localhost:3000/api/Messages')
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#messages { list-style-type: none; margin: 0; padding: 0; }
#messages li { padding: 5px 10px; }
#messages li:nth-child(odd) { background: #eee; }
#form {position: fixed; bottom: 50px; }
</style>
