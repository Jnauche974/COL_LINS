<template>
  <div>
    <v-alert
      :value="alert"
      dismissible
      :type="type"
    >
      {{message}}
    </v-alert>
  </div>
</template>

<script>
  import {EventBus } from './event-bus.js';
  export default {
      //success, error, info, warning
    data () {
      return {
        alert: false,
        type: 'error',
        message: ''
      }
    },
    mounted(){
      EventBus.$on('topic-added', (arg)=> {
        let { alert , type, message} = arg;
        this.SetPopUp(alert, type, message);
      });
    },
    methods: {
        SetPopUp: function(alertVal, typeVal, messageVal){
            this.alert = alertVal;
            this.type = typeVal;
            this.message = messageVal;
        }
    }
  }
</script>