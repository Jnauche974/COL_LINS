<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <div id="messageChat"></div>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <div>
              <p v-if="isConnected">Nous somme connecté au serveur!</p>
              <p v-if="!isConnected">Nous somme déconnecté au serveur!</p>
              <button @click="pingServer()">Ping Server</button>

              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="message"
                  :rules="messageRules"
                  :counter="200"
                  label="Message"
                  required
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  @click="submit"
                >
                  Envoyer
                </v-btn>
                <v-btn @click="clear">Effacer</v-btn>
              </v-form>

          </div>
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
  
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      message: '',
      socketMessage: '',
      messageRules: [
        v => !!v || 'Message is required',
        v => (v && v.length <= 200) || 'Message must be less than 200 characters'
      ],
      isConnected: false 
    }),
    render: function (createElement) {
      return createElement('h1', this.socketMessage)
    },

    sockets: {
      connect() {
        this.isConnected = true;
      },

      disconnect() {
        this.isConnected = false;
      },

      chatMessage (message) {
        document.getElementById('messageChat').innerHTML +=  "<p>" + message + "</p>"; 
      }
    },

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$socket.emit('chatMessage', this.message);
          this.message = '';
        }
      },

      clear () {
        this.$refs.form.reset()
      },

      pingServer() {
        this.$socket.emit('pingServer', 'PING!');
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
</style>
