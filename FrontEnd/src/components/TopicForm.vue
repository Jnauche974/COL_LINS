<template>
  <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" fab dark small color="indigo">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Ajout topic</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Topic's name" v-model="topic.Name" required hint="Exemple : Coupe du monde"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-select
                  v-model="topic.typeId"
                  :items="types"
                  item-text="Name"
                  item-value="id"
                  label="Type du topic"
                  >
                  </v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Sujet"
                    multiple
                    chips
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="dialog = false" @click="addTopic(topic)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
  import axios from 'axios';
  import ListeTopicsVue from './ListeTopics.vue';
  const API_Topic = 'http://10.0.0.100:3000/api/Topics';
  const API_Type = 'http://10.0.0.100:3000/api/Types';

  export default {
    data () {
      return {
        refreshListTopic: ListeTopicsVue.methods.refresh,
        maj: false,
        bonjour1: 'test',
        dialog: false,
        types: [],
        topics: [],
        topic: {
          Name: '',
          Close: false,
          histopicId: null,
          typeId: ''
        }
      }
    },
    mounted(){
      this.getType();
    },
    methods: {
      addTopic: function(topic) {
        // const that = this;
        axios.post(API_Topic, topic)
        .then(response =>{
          this.maj = true;
          // that.refreshListTopic();
          // // ListeTopicsVue.methods.refresh();
          return response;

        })
      },
      getType: function() {
        axios.get(API_Type)
        .then(response =>{
          this.types = response.data
        })
        .catch(e =>{
          this.errors.push(e)
        })
      }
    }
    }
</script>