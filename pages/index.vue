<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <h1>Songs:</h1>
      </v-card>
<!-- tabla -->
      <v-data-table
        :headers="headers"
        :items="songs"
        :items-per-page="5"
        class="elevation-1"
        :loading="loadingVar"
        loading-text="Loading Songs..."
        @click:row="songClick"
      ></v-data-table>

    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return { 
      headers: [
        {text: 'Title', value: 'title'},
        {text: 'Artist', value: 'artist'},
        {text: 'Album', value: 'album'},
      ],
      loadingVar:true, 
      songs: [],

    }
  },
  mounted() {
    this.getSong()
  },
  methods: {
    getSong: async function(){
      let response = await this.$axios.$get('/songs')
      this.songs = response;
      this.loadingVar = false;
    },
   
    songClick(row) {
      this.songs.map((item, index) => {
          item.selected = item === row
          this.$set(this.songs, index, item)
      })
      alert(row.title)
      this.$router.push('player/'+row.id);
    },
  }
}
</script>