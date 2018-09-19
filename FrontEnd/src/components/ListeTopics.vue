<template>
      <v-card>
        <v-list two-line subheader>
          <v-subheader inset>Mes topics</v-subheader>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            avatar
            @click=""
          >           

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-subheader inset>Mes abonnements</v-subheader>

          <v-list-tile
            v-for="item in items2"
            :key="item.title"
            avatar
            @click=""
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
  export default {
    data () {
      return {
        items: [
          { iconClass: 'grey lighten-1 white--text', title: 'Topic 1', subtitle: 'Jan 9, 2018' },
          { iconClass: 'grey lighten-1 white--text', title: 'Topic 2', subtitle: 'Jan 17, 2018' },
          { iconClass: 'grey lighten-1 white--text', title: 'Topic 3', subtitle: 'Jan 28, 2018' }
        ],
        items2: [
          { iconClass: 'blue white--text', title: 'Mes abonnements 1', subtitle: 'Jan 20, 2018' },
          { iconClass: 'amber white--text', title: 'Mes abonnements 2', subtitle: 'Jan 10, 2018' }
        ]
      }
    }
  }
</script>