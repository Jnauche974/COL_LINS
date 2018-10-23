<template>
<v-snackbar
        v-model="snackbar"
        :right="true"
        :timeout="timeout"
        :top="true"
        :color="color"
      >
        {{ text }}
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
</v-snackbar>
</template>
<script>
import {EventBus } from './event-bus.js';
  export default {
    data () {
      return {
        snackbar: false,
        timeout: 6000,
        text: '',
        color: ''
      }
    },
     mounted(){
      EventBus.$on('topic-messaged', (arg)=> {
        let { alert , type, message} = arg;
        this.SetSnackBar(alert, type, message);
      });
    },
    methods: {
        SetSnackBar: function(alertVal, typeVal, messageVal){
            this.snackbar = alertVal;
            this.color = typeVal;
            this.text = messageVal;
        }
    }
  }
</script>
