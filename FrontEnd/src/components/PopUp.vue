<template>
  <div>
    <v-alert
      v-model="alert"
      dismissible
      type="success"
    >
      This is a success alert that is closable. {{message}}
    </v-alert>
  </div>
</template>

<script>
// this.SetPopUp(false, 'success', 'test de julien');
  export default {
    data () {
      return {
        alert: false,
        type: 'success',
        message: ''
      }
    },
    mounted(){
        // this.SetPopUp(true, 'success', 'test de julien');
    },
    methods: {
        SetPopUp: function(alertVal, typeVal, messageVal){
            this.alert = alertVal;
            this.type = typeVal;
            this.alert = messageVal;
        }
    }
  }
</script>