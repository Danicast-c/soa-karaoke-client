<template>
  <v-card>
    <!-- <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <h1>Songs:</h1>
      </v-card> -->
    <!-- tabla -->
    <v-card-title>
      Song
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="filteredHeaders"
      :items="songs"
      :items-per-page="100"
      :search="search"
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

    <!-- </v-col> -->
    <!-- </v-row> -->

    <!-- <div class="text-center">
      <v-dialog v-model="buy_premium_dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Click Me
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Privacy Policy
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="buy_premium_dialog = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    <!-- </div> -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      buy_premium_dialog: false,
      search: "",
      headers: [
        {
          text: "Play",
          value: "play",
        },
        {
          text: "Title",
          value: "title",
        },
        {
          text: "Artist",
          value: "artist",
        },
        {
          text: "Album",
          value: "album",
        },
        {
          text: "Edit",
          value: "actions",
          visible: false,
        },
      ],
      loadingVar: true,
      songs: [],
    };
  },
  mounted() {
    this.getSongs();
  },
  computed:{
    filteredHeaders(){
        if( this.$auth.user?.role!="premium"){
         this.headers= this.headers.filter((item) => item.value != "actions");
        }
        return this.headers
  },
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
    //   this.buy_premium_dialog = true;
      console.log(song);
      this.$router.push("edit_song/" + song.id);
    },
  },
};
</script>
