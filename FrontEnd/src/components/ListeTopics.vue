<template>
      <v-card>
        <PopUp/>
        <v-list two-line subheader>
          <v-subheader inset>Mes topics</v-subheader>

          <TopicForm/>
          <v-list-tile
            v-for="topic in topics"
            :key="topic.title"
            avatar
          >
            <v-list-tile-content>
              <v-chip
              v-model="chip_remove"
              close
              color="red"
              outline
              v-if="topic.typeId == '5bb3173947a5260016c52947' "
              @input="removeTopic(topic.id)"
              >
                {{ topic.Name }}
              </v-chip>
              <v-chip
              v-model="chip_remove"
              close
              color="green"
              outline
              v-else
              @input="removeTopic(topic.id)"
              >
                {{ topic.Name }}
              </v-chip>

              <!-- <v-list-tile-title>{{ topic.Name }}</v-list-tile-title> -->
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-subheader inset>Mes abonnements</v-subheader>

          <v-list-tile
            v-for="item in items2"
            :key="item.title"
            avatar
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>

</template>
<script>
  import axios from 'axios';
  import TopicForm from './TopicForm';
  import PopUp from './PopUp';

  const API_Topic = 'http://10.0.0.100:3000/api/Topics/';

  export default {
    components: {
      TopicForm,
      PopUp
    },
  data () {
    return {
      chip_remove: true,
      topics: [],
      errors: [],
      item2: [],
      topic: {
        Name: '',
        Close: '',
        histopicId: '',
        typeId: ''
      }
    }
  },
  mounted(){
    this.getTopic();
  },
  // watch:{
  //   topics: function(){
  //     this.getTopic();
  //   }
  // },
  methods: {
    getTopic: function() {
      const that = this;
      axios.get(API_Topic)
      .then(response =>{
        that.topics = response.data;
      })
      .catch(e =>{
        this.errors.push(e)
      })
    },
    removeTopic: function(id) {
       const that = this;
      // id = "5bb4674c47a5260016c5296a";
      axios.delete(API_Topic + id)
      // .then(response => this.topics.splice(index,1));
      .then(function() {
        that.getTopic();
        window.location.reload();
      })
    },
  },
  // update: function() {
  //   this.getTopic();
  // }
}
</script>