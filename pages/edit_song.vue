<template>
  <p v-if="$fetchState.pending">
    <span class="loading"></span>
  </p>
  <p v-else-if="$fetchState.error">Error while fetching song 🤬</p>
  <div v-else>

    <audio src="https://storage.googleapis.com/soa-karaoke-canciones/09b2f3a7-7602-4f96-0846-f74292deb147"></audio>
    <form @submit.prevent="submit">
      <h1>Edit song</h1>
      <v-text-field v-model="song.title" label="Song Name"></v-text-field>
      <v-text-field v-model="song.artist" label="Artist Name"></v-text-field>
      <v-text-field v-model="song.album" label="Album Name"></v-text-field>
      <LyricsLines :lines="this.song.lyrics" />
      <v-btn class="mr-4" type="submit"> submit </v-btn>
    </form>



  </div>

  <!-- <v-container :loading="loadingVar">
    <h1>Edit song</h1>
    <v-text-field v-model="song.title" label="Song Name"></v-text-field>
    <v-text-field v-model="song.artist" label="Artist Name"></v-text-field>
    <v-text-field v-model="song.album" label="Song Name"></v-text-field>
    <h2>Edit lines</h2>
    <LyricsLines :lines="this.song.lyrics" />
  </v-container> -->
</template>

<script>
export default {
  data() {
    return {
      loadingVar: true,
      edit: null,
      song: {
        title: "",
        artist: "",
        album: "",
        lyrics: [
        ],
      },
    };
  },
  mounted() {
    this.$fetch();
  },
  created: function () {
    console.log("route", this.$route);
  },
  async fetch() {
    this.song = await this.$axios.$get('/songs/'+this.$route.params.id);
  },
  props: {},
  component: {},

  methods: {

    submit() {

      this.$axios
        .$patch("/songs/"+this.$route.params.id, this.song)
        .then((response) => {
          console.log("Success!");
          console.log({ response });
          this.$router.push({ path: '/'}) // -> /user

        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
};
</script>
