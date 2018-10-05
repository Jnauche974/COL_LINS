<template>
  <div>
    <v-toolbar
      color="purple"
      dark
      tabs
    >
      <v-text-field
        append-icon="mic"
        class="mx-3"
        flat
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>

      <v-tabs
        slot="extension"
        v-model="tabs"
        centered
        color="transparent"
        slider-color="white"
      >
        <v-tab
          v-for="n in items"
          :key="n"
        >
          {{ n }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item
        v-for="item in items"
        v-if="item == 'Topics' "
        :key= "item"
      >
        <ListeTopic/>
      </v-tab-item>
      <v-tab-item
        v-for="item in items"
        v-if="item == 'Abonnements' "
        :key= "item"
      >
        <ListeTopic/>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import ListeTopic from './ListeTopics';
import axios from "axios";

const API_Topic = "http://10.0.0.100:3000/api/Topics/";

  export default {
    components: {
        ListeTopic,
    },
    data () {
      return {
        items: ['Topics','Abonnements'],
        tabs: null,
        topics: [],
        topic: {
        Name: "",
        Close: "",
        id: "",
        histopicId: "",
        typeId: ""
      },
        abos: [],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    mounted() {
       this.getTopic();
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
    },
  }
</script>