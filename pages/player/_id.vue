<template>
  <v-row justify="center" align="center">

      <v-col cols="12" sm="8" md="6">
        <v-card class="logo py-4 d-flex justify-center hover">  
         
          <v-card-title>
            <h1> {{data.title}}</h1>
          </v-card-title>
     
          <h2> {{data.artist}}</h2>
  
          
        </v-card>

        <!-- Music Player -->
        <vue-plyr ref="plyr">
          <audio controls crossorigin playsinline>
            <source
                src='mp3'
                type="audio/mp3"
            />
          </audio>
        </vue-plyr>

        <h3>Current time: {{currentTime}} / Lyrics index: {{lyrics_index}} / {{lyrics_max_index}}</h3>
        <h3 v-html="lyrics"></h3>
      </v-col>

  </v-row>
</template>

<script>
export default {
  data () {
    return { 
      id: this.$route.params.id,
      data:'',
      loadingVar:true,
      mp3:'',
      lyrics_index:0,
      lyrics_max_index:0,
      lyrics:'',
      currentTime: -1,
      }
  },
  mounted() {
    this.getSong()
    this.$refs.plyr.player.on('timeupdate', () => this.currentTime = this.$refs.plyr.player.currentTime)
    this.$refs.plyr.player.on('timeupdate', () => this.updateLyrics())
  },
  methods: {
    getSong: async function(){
      let response = await this.$axios.$get('/songs/'+this.id)
      this.data = response;
      this.mp3 = 'https://cors.josephtico.workers.dev/?'+response.mp3;
      this.lyrics_max_index = response.lyrics.length-1;
      this.updateSong();
      this.loadingVar = false;
    },
    updateSong() {
      let player = this.$refs.plyr.player
      player.source = {
        type: 'audio',
        sources: [
          {
            src: this.mp3,
            type: 'audio/mp3',
          },
        ],
      };
    },
    updateLyrics: function(){
      let lyric_position = this.data.lyrics[this.lyrics_index]
      if (lyric_position.startTime-1 <= this.currentTime && lyric_position.endTime > this.currentTime){
        this.lyrics = lyric_position.text
      } else if (lyric_position.startTime < this.currentTime && lyric_position.endTime < this.currentTime){
        this.lyrics = ''
        if(this.lyrics_index < this.lyrics_max_index) this.lyrics_index += 1;
      } else if (lyric_position.startTime > this.currentTime && lyric_position.endTime > this.currentTime){
        this.lyrics = ''
        if(this.lyrics_index > 0) this.lyrics_index -= 1;
      }
    }
  },
}
</script>