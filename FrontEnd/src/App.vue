<template>
  <v-app id="inspire">
   <!-- nav right  -->
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      app
    >
    <!-- include du chat: ./components/ListeMembres.vue -->
        <ListeMembres/>
    </v-navigation-drawer>
<!-- nav right  -->

<!-- Barre titre -->
    <v-toolbar
      color="blue-grey lighten-1"
      dark
      fixed
      app

    >
      <v-toolbar-title>Titre du topic</v-toolbar-title>
    </v-toolbar>
<!-- Barre titre -->

<!--  nav left -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      
       <CardProfile/>

       <!-- include du chat: ./components/ListeTopics.vue --> 
       <!-- <ListeTopics/> -->
       <tabIndex/>
       
    </v-navigation-drawer>
<!--  nav left -->

<!-- Centre de la page -->
    <v-content>
      <v-container fluid fill-height>
        <!-- include du chat: ./components/Chat.vue -->
         <Chat/>
      </v-container>
    </v-content>
<!-- Centre de la page -->

    <v-footer color="blue-grey" class="white--text" app>
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
// Import des templates
import Chat from './components/Chat'
import ListeMembres from './components/ListeMembres'
import CardProfile from './components/CardProfile'
import tabIndex from './components/tabIndex'
import PopUp from './components/PopUp';

export default {
  name: 'App',
  components: {
    Chat,
    ListeMembres,
    CardProfile,
    PopUp,
    tabIndex
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      drawerRight: false,
      title: 'Titre topics'
    }
  }
}
</script>
