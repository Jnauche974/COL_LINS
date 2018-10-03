<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" fab dark small color="orange">
          <v-icon dark>edit</v-icon>
        </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Topic edition</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-select
                  v-model="topic.typeId"
                  :items="topics"
                  item-text="Name"
                  item-value="id"
                  label="Nom du topic"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Edit', 'Remove']"
                  label="Action"
                  chips
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6 md4>
                  <v-text-field label="Topic's name" v-model="topic.Name" required hint="Exemple : Coupe du monde"></v-text-field>
                </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">{{ action}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ListeTopicsVue from "./ListeTopics.vue";

export default {
  components: {
    ListeTopicsVue
  },
  data: () => ({
    dialog: false,
    action: "edit",
    getTopic: ListeTopicsVue.methods.getTopic,
    topics: [],
    topic: {
      Name: "",
      Close: false,
      histopicId: null,
      typeId: ""
    }
  }),
  mounted() {
    this.getTopic();
  },
  methods: {}
};
</script>
