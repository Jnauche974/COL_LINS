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
        v-model="search"
        flat
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
      >
      </v-text-field>


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
        v-if="item == 'Topics' && searchProcess != true"
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
// https://www.youtube.com/watch?v=G34_yNV8FMY
const API_Topic = "http://localhost:3000/api/Topics/";


  export default {
    components: {
        ListeTopic,
    },
    data () {
      return {
        items: ['Topics','Abonnements'],
        topics: [],
        tabs: null,
        abos: [],
        searchProcess: false,
        search: ''
      }
    },
    created() {
      this.getTopic();
    },
    watch: {
        filteredTopics: function() {
            return this.topics.filter((topic) => {
                return topic.Name.match(this.search);
            })
        }
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
        // eslint-disable-next-line
        console.log(this.search);
    },
    }
  }
</script>