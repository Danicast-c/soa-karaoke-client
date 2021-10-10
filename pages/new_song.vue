<template>
  <v-container>
    <form @submit.prevent="submit">
      <h1>New song</h1>
      <v-text-field v-model="song.title" label="Song Name"></v-text-field>
      <v-text-field v-model="song.artist" label="Artist Name"></v-text-field>
      <v-text-field v-model="song.album" label="Album Name"></v-text-field>
      <v-file-input
        show-size
        chips
        label="Archivo musica"
        ref="myfile"
        v-model="file"
      ></v-file-input>
      <v-btn class="mr-4" type="submit"> submit </v-btn>
    </form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      edit: null,
      file: {},
      song: {
        title: "",
        artist: "",
        album: "",
        lyrics: [
        ],
      },
    };
  },
  component: {},

  methods: {
    submit() {
      console.log("SBMIT", this.file);
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("title", this.song.title);
      formData.append("artist", this.song.artist);
      formData.append("album", this.song.album);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post("/songs", formData, config)
        .then((response) => {
          console.log("Success!");
          console.log({ response });
          this.$router.push({ path: 'edit_song/'+response.id }) // -> /user
          console.log("router???!");

        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
};
</script>
