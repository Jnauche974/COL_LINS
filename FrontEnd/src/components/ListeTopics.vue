<template>
      <v-card>
        <v-layout row justify-center>
          <EditTopic/>
          <TopicForm/>
        </v-layout>
          <v-list-tile
            v-for="topic in topics"
            :key="topic.title"
            avatar
            v-if="topic.Close == false"
          >

            <v-list-tile-content v-scroll>
                <v-chip
                v-model="chip_remove"
                color="blue"
                outline
                @input="removeTopic(topic.id)"
                @click="emitSelectTopic(topic.id)"
                >
                  {{ topic.Name }}
                </v-chip>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
      </v-card>

</template>
<script>
import axios from "axios";
import TopicForm from "./TopicForm";
import EditTopic from "./EditTopic";
import {EventBus } from './event-bus.js';
import Settings from '../../appSettings';


const API_Topic = Settings.BaseURL + Settings.Api.TOPICS;

export default {
  components: {
    TopicForm,
    EditTopic,
  },
  data() {
    return {
      chip_remove: true,
      topics: [],
      item2: [],
      topic: {
        Name: "",
        Close: "",
        id: "",
        histopicId: "",
        typeId: ""
      }
    };
  },
  mounted() {
    this.getTopic();
    EventBus.$on('topic-changed', ()=> {
      this.getTopic();
    });
  },
  methods: {
    getTopic: function() {
      const that = this;
      axios
        .get(API_Topic) //+'?filter[limit]=10'
        .then(response => {
          that.topics = response.data;
        })
        .catch(e => {
          this.errors.push(e);
          // eslint-disable-next-line
          console.error(errors);
        });
    },
    emitSelectTopic: function(id){
      EventBus.$emit('topic-selected', id);
    },
    removeTopic: function(id) {
      const that = this;
      axios.delete(API_Topic + id).then(function() {
        EventBus.$emit('topic-changed');
        EventBus.$emit('topic-messaged', {alert: true, type: 'orange' , message: 'Suppression du topic réussi !'});
      })
      .catch(e => {
        EventBus.$emit('topic-messaged', {alert: true, type: 'error' , message: 'Suppression du topic non réussi !'});
          // eslint-disable-next-line
          console.error(e.message);
        });
    },
    editTopic: function(topic) {
      const that = this;
      axios.put(API_Topic + topic.id, topic).then(function() {
        EventBus.$emit('topic-messaged', {alert: true, type: 'info' , message: 'Modification du topic réussi !'});
        EventBus.$emit('topic-changed');
      })
      .catch(e => {
          EventBus.$emit('topic-messaged', {alert: true, type: 'error' , message: 'Modification du topic non réussi !'});
          // eslint-disable-next-line
          console.error(e.message);
        });
    }
  }
};
</script>