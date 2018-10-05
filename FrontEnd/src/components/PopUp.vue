<template>
  <div>
    <v-alert
      v-model="alert"
      dismissible
      :type="type"
    >
      {{message}}
    </v-alert>
  </div>
</template>

<script>
  export default {
      //success, error, info, warning
    data () {
      return {
        alert: '',
        type: '',
        message: ''
      }
    },
    mounted(){
        //this.SetPopUp(true, 'success', 'test de julien');
    },
    methods: {
        SetPopUp: function(alertVal, typeVal, messageVal){
            this.alert = alertVal;
            this.type = typeVal;
            this.message = messageVal;
            window.location.reload();
        }
    }
  }
</script>