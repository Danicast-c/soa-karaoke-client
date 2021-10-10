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
      >
        <!-- @click:row="songClick" -->

        <template v-slot:item.play="{ item }">
          <v-btn-toggle>
            <v-btn variant="primary" @click="playSong(item)">
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn-toggle>
            <v-btn variant="primary" @click="editSong(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Play", value: "play" },
        { text: "Title", value: "title" },
        { text: "Artist", value: "artist" },
        { text: "Album", value: "album" },
        { text: "Edit", value: "actions" },
      ],
      loadingVar: true,
      songs: [],
    };
  },
  mounted() {
    this.getSongs();
  },
  methods: {
    getSongs: async function () {
      let response = await this.$axios.$get("/songs");
      this.songs = response;
      this.loadingVar = false;
    },

    // songClick(row) {
    //   this.songs.map((item, index) => {
    //     item.selected = item === row;
    //     this.$set(this.songs, index, item);
    //   });
    //   this.$router.push("player/" + row.id);
    // },
    playSong(song) {
      console.log(song);
      this.$router.push("player/" + song.id);
    },
    editSong(song) {
      console.log(song);
      this.$router.push("edit_song/" + song.id);
    },
  },
};
</script>