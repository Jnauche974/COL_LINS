<template>
      <v-card>
        <PopUp/>
        <SnackBarInfo/>

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
              <!-- <longpress duration="2" pressing-text="Keep pressing for {$rcounter} seconds to delete" action-text="Deleting, please wait..."> -->
                <v-chip
                v-model="chip_remove"
                color="grey"
                outline
                v-if="topic.typeId == '5bb3173947a5260016c52947' "
                @input="removeTopic(topic.id)"
                >
                  {{ topic.Name }}
                </v-chip>
                <v-chip
                v-model="chip_remove"
                color="blue"
                outline
                v-else
                @input="removeTopic(topic.id)"
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
import PopUp from "./PopUp";
import EditTopic from "./EditTopic";
 import {EventBus } from './event-bus.js';
 import Settings from '../../appSettings';

const API_Topic = Settings.BaseURL + Settings.Api.TOPICS;

export default {
  components: {
    TopicForm,
    PopUp,
    EditTopic
  },
  data() {
    return {
      chip_remove: true,
      topics: [],
      errors: [],
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
    removeTopic: function(id) {
      axios.delete(API_Topic + id).then(function() {
        EventBus.$emit('topic-changed');
      });
    },
    editTopic: function(topic) {
      axios.put(API_Topic + topic.id, topic).then(function() {
        EventBus.$emit('topic-changed');
      });
    }
  }
};
</script>