<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" fab dark small color="orange">
          <v-icon dark>build</v-icon>
        </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Topic edition</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout  wrap>
              <v-flex xs12 sm6>
                <v-select
                  v-model="topic.id"
                  :items="topics"
                  item-text= "${data.item.Name}, ${data.item.Close}"
                  item-value="id"
                  label="Nom du topic :"
                >
                <template slot="selection" slot-scope="data">
                  {{ data.item.Name }} ({{ translate(data.item.Close) }} )
                </template>
                <template slot="item" slot-scope="data">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="`${ data.item.Name } (${ translate(data.item.Close) })`">
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  v-model="action"
                  :items="['Edit', 'Remove']"
                  label="Action"
                  chips
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6 md4 v-if="action == 'Edit'">
                  <v-text-field label="Nouveau nom :" v-model="topic.Name" required hint="Exemple : Coupe du monde"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 v-if="action == 'Edit'">
                    <v-select
                    v-model="topic.typeId"
                    :items="types"
                    item-text="Name"
                    item-value="id"
                    label="Type du topic :"
                    >
                    </v-select>
                </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false" @click="doAction(action,topic)">{{ action}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ListeTopicsVue from "./ListeTopics.vue";
import TopicFormVue from "./TopicForm.vue";

export default {
  components: {
    ListeTopicsVue
  },
  data: () => ({
    dialog: false,
    action: "edit",
    getTopic: ListeTopicsVue.methods.getTopic,
    editTopic: ListeTopicsVue.methods.editTopic,
    removeTopic: ListeTopicsVue.methods.removeTopic,
    getType: TopicFormVue.methods.getType,
    topics: [],
    topic: {
      Name: "",
      Close: false,
      id: "",
      histopicId: null,
      typeId: ""
    }
  }),
  mounted() {
      this.doMaj();
  },
  methods: {
    doAction: function(action, topic) {
      const that = this;
      if (action == "Edit") {
        that.editTopic(topic);
      } else {
        that.removeTopic(topic.id);
      }

    },
    doMaj: function () {
        const that = this;
        that.getTopic();
        that.getType();
    },
    translate: function (bool) {
        if(bool){
            return "FERME"
        }
        else {
            return "OUVERT"
        }
    }
  }
};
</script>
