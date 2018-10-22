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
 import SnackBarInfo from "./SnackbarInfo";
 import {EventBus } from './event-bus.js';

const API_Topic = "http://10.0.0.100:3000/api/Topics/";

export default {
  components: {
    TopicForm,
    PopUp,
    EditTopic,
    SnackBarInfo
    // tabIndex

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
     EventBus.$on('topic-reloaded', ()=> {
         this.getTopic();
      });
  },
  methods: {
    getTopic: function() {
      const that = this;
      axios
        .get(API_Topic)
        .then(response => {
          that.topics = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    removeTopic: function(id) {
      const that = this;
      axios.delete(API_Topic + id).then(function() {
        that.getTopic();
        EventBus.$emit('topic-reloaded');
      });
    },
    editTopic: function(topic) {
      const that = this;
      axios.put(API_Topic + topic.id, topic).then(function() {
        that.getTopic();
        EventBus.$emit('topic-reloaded');
      });
    }
  }
};
</script>