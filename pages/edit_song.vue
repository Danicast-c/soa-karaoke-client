<template>
  <v-container>
    <h1>Edit song</h1>
    <v-text-field v-model="song.title" label="Song Name"></v-text-field>
    <v-text-field v-model="song.artist" label="Artist Name"></v-text-field>
    <v-text-field v-model="song.album" label="Song Name"></v-text-field>
    <h2>Edit lines</h2>
    <LyricsLines :lines="this.song.lyrics" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      edit: null,
      song: {
        title: "Mamma mia",
        artist: "ABBA",
        album: "ALBUM2",
        lyrics: [
          {
            start: 5009,
            end: 6000,
            text: "mama mia 1",
            index: 0,
          },
          {
            start: 6003,
            end: 7000,
            text: "mama mia 2",
            index: 1,
          },
          {
            start: 7000,
            end: 70000,
            text: "mama mia 3",
            index: 2,
          },
        ],
      },
    };
  },
  component: {},

  methods: {},
};
</script>
