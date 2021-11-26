<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css?family=Sriracha"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Bad+Script"
      rel="stylesheet"
    />
    <div
      class="karaoke_banner_section"
      id="karaoke_banner_div"
      @dblclick="toggleFullScreen()"
    >
      <div class="song_title">
        <h1>
          {{ data.title }}
        </h1>
        <h3>
          {{ data.artist }}
        </h3>
      </div>

      <div class="karaoke_banner">
        <div class="neon-sign" v-html="lyrics" v-if="scoreReady == false"></div>

        <div v-if="scoreReady == true">
          <div class="neon-sign">Obtained score: {{ matchPercentage }} %</div>
          <div class="neon-sign">
            <v-icon size="100" v-if="matchPercentage >= 30">mdi-star</v-icon>
            <v-icon class="neon-sign-off" size="100" v-else>mdi-star-outline</v-icon>
            <v-icon size="100" v-if="matchPercentage >= 60">mdi-star</v-icon>
            <v-icon class="neon-sign-off" size="100" v-else>mdi-star-outline</v-icon>
            <v-icon size="100" v-if="matchPercentage >= 90">mdi-star</v-icon>
            <v-icon class="neon-sign-off" size="100" v-else>mdi-star-outline</v-icon>
          </div>

          <div>
            <v-btn color="teal darken-1" elevation="2" x-large to="/"
              >Return to songs list</v-btn
            >
            <!-- <v-btn color="red darken-1" elevation="2" x-large  @click="singAgain()">Sing again</v-btn> -->
          </div>
        </div>
      </div>

      <tr>
        <th v-if="scoreReady == false" class="karaoke_player">
          <vue-plyr ref="plyr" class="karaoke_player">
            <audio controls crossorigin playsinline>
              <source src="mp3" type="audio/mp3" />
            </audio>
          </vue-plyr>
        </th>
        <th>
          <v-btn
            @click="toggleFullScreen()"
            large
            dark
            style="background-color: #090000;"
          >
            <v-icon style="height:100%"> mdi-fullscreen</v-icon>
          </v-btn>
        </th>
      </tr>
    </div>

  </div>
</template>

<style>
.song_title {
  margin-left: 1rem;
  margin-top: 1rem;
  font-size: 3vmin;
}

.song_title h1 {
  font-size: 5vmin;
  --interval: 1s;
  display: block;
  text-shadow: 0 0 10px var(--color1), 0 0 20px var(--color2),
    0 0 40px var(--color3), 0 0 80px var(--color4);
  will-change: filter, color;
  filter: saturate(60%);
  animation: flicker steps(100) var(--interval) 1s infinite;
  color: azure;
  --color1: azure;
  --color2: aqua;
  --color3: dodgerblue;
  --color4: blue;
  font-family: Sriracha;
}

.karaoke_banner_section {
  margin: 1rem;
  background-color: #090000;
}

.karaoke_banner {
  margin: 2rem;
  min-height: 50vh;
  background: #090000;
  font-size: 10vmin;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;
  height: 70%;
}

.karaoke_player {
  width: 100%;
}

.neon-sign {
  --interval: 0.5s;
  display: block;
  text-shadow: 0 0 10px var(--color1), 0 0 20px var(--color2),
    0 0 40px var(--color3), 0 0 80px var(--color4);
  will-change: filter, color;
  filter: saturate(60%);
  animation: flicker steps(100) var(--interval) 1s infinite;
  color: lightyellow;
  --color1: yellow;
  --color2: gold;
  --color3: orange;
  --color4: darkred;
  font-family: Bad Script;
}
.neon-sign-off{
    text-shadow: 0 0 10px var(--color1_off), 0 0 20px var(--color2_off),
    0 0 40px var(--color3_off), 0 0 80px var(--color4_off);
    --color1_off: hsla(60, 100%, 27%, 0.5);
    --color2_off: rgba(87, 74, 0, 0.5);
    --color3_off: rgba(75, 49, 0, 0.5);
    --color4_off: hsla(0, 100%, 12%, 0.5);
    opacity: 0.3;
}

.plyr--audio .plyr__controls {
  background-color: #090000 !important;
}

@keyframes flicker {
  50% {
    color: white;
    filter: saturate(200%) hue-rotate(20deg);
  }
}
</style>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      data: "",
      loadingVar: true,
      mp3: "",
      lyrics_index: 0,
      lyrics_max_index: 0,
      lyrics: "",
      currentTime: -1,
      SpeechRecognition: null,
      SpeechGrammarList: null,
      SpeechRecognitionEvent: null,
      matchPer: "100",
      matchPhrase: "",
      songStartedPlaying: false,
      recognizedText: "",
      recognition: null,
      recognitionResultReady: false,
      songAllreadyEnded: false,
      recognitionRunning: false,
      scoreReady: false,
      starSizes: [],
      finalScore: 0
    };
  },
  mounted() {
    this.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    this.SpeechRecognitionEvent =
      window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    this.recognition = new this.SpeechRecognition();

    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = "es-ES";
    this.recognition.maxAlternatives = 1;
    this.recognition.onstart = function() {
      console.log("started recognition");
      this.recognitionResultReady = false;
      //   this.recognitionRunning = true;
    };
    this.recognition.onend = this.recognition_onend;
    // this.recognition.onend = function() {
    //   console.log("ended recognition");
    //   this.recognitionRunning = false;
    // };
    this.recognition.onresult = event => {
      let last = event.results.length - 1;
      let command = event.results[last][0].transcript;
      console.log("result", command);
      this.recognizedText += " ";
      this.recognizedText += command;
      this.recognitionResultReady = true;
      console.log("recognitionResultReady", this.recognitionResultReady);
    };

    this.getSong();
    this.$refs.plyr.player.on(
      "timeupdate",
      () => (this.currentTime = this.$refs.plyr.player.currentTime)
    );
    this.$refs.plyr.player.on("timeupdate", () => {
      this.checkRecognition();
      this.updateLyrics();
    });
    this.$refs.plyr.player.on("ended", () => this.songEnded());
    this.$refs.plyr.player.on("play", () => this.songPlaying());
    this.$refs.plyr.player.on("pause", () => this.songPaused());
  },
  methods: {
    levenshteinDistance: function(a, b) {
      if (a.length == 0) return b.length;
      if (b.length == 0) return a.length;

      var matrix = [];

      // increment along the first column of each row
      var i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      // increment each column in the first row
      var j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      // Fill in the rest of the matrix
      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) == a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              Math.min(
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1
              )
            ); // deletion
          }
        }
      }

      return matrix[b.length][a.length];
    },
    matchPercentage: function(phrase, speechResult) {
      var max = this.levenshteinDistance(phrase, "");
      var distance = this.levenshteinDistance(phrase, speechResult);
      var percentage = ((max - distance) / max) * 100;
      return percentage;
    },

    getSong: async function() {
      let response = await this.$axios.$get("/songs/" + this.id);
      this.data = response;
      this.mp3 = "https://cors.josephtico.workers.dev/?" + response.mp3;
      this.lyrics_max_index = response.lyrics.length - 1;
      this.updateSong();
      this.loadingVar = false;
    },
    updateSong() {
      let player = this.$refs.plyr.player;
      player.source = {
        type: "audio",
        sources: [
          {
            src: this.mp3,
            type: "audio/mp3"
          }
        ]
      };
    },
    updateLyrics: function() {
      let lyrics_index_OLD = this.lyrics_index;
      let lyric_position = this.data.lyrics[this.lyrics_index];
      if (
        lyric_position.startTime <= this.currentTime &&
        lyric_position.endTime > this.currentTime
      ) {
        this.lyrics = lyric_position.text;
      } else if (
        lyric_position.startTime < this.currentTime &&
        lyric_position.endTime < this.currentTime
      ) {
        this.lyrics = "";
        if (this.lyrics_index < this.lyrics_max_index) {
          this.lyrics_index += 1;
        }
      } else if (
        lyric_position.startTime > this.currentTime &&
        lyric_position.endTime > this.currentTime
      ) {
        this.lyrics = "";
        if (this.lyrics_index > 0) {
          this.lyrics_index -= 1;
        }
      }

      if (lyrics_index_OLD != this.lyrics_index) {
        console.log("NEW LINE", this.lyrics_index);
      }
    },
    toggleFullScreen() {
      let elem = document.getElementById("karaoke_banner_div");
      if (!document.fullscreenElement) {
        elem.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
    recognition_onend() {
      console.log("recognition_onend 2");
      this.recognitionRunning = false;
    },
    startRecognition() {
      this.recognition.start();
    },
    songStarted() {
      console.log("songStarted");
      this.recognitionRunning = true;
      this.songStartedPlaying = true;
      this.startRecognition();
    },
    songPlaying() {
      if (this.songStartedPlaying == false) {
        this.songStarted();
      } else {
        console.log("songPlaying");
      }
    },
    checkRecognition() {
      if (
        this.songStartedPlaying &&
        this.recognitionRunning == false &&
        this.songAllreadyEnded == false
      ) {
        console.log("checkRecognition restart");
        this.recognitionRunning = true;
        this.recognition.start();
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    songEnded: async function() {
      this.songAllreadyEnded = true;
      console.log("SONG ended");
      this.recognition.stop();
      let wait = 0;
      while (!this.recognitionResultReady) {
        console.log("waiting for result");
        await this.sleep(100);
        wait += 100;
        if (wait > 1000) {
          console.log("waited too long");
          this.recognitionResultReady = true;
          break;
        }
      }
      let score = this.calculateResult(this.recognizedText);
      this.matchPercentage = Math.round(score);
    //   this.matchPercentage = 60;
      this.postScore();
      this.scoreReady = true;

    },
    songPaused() {
      console.log("songPaused");
      // this.recognition.
      // this.recognition.pause();
      // this.recognition.stop();
    },
    mergeLyrics() {
      let result = "";
      for (let i = 0; i < this.data.lyrics.length; i++) {
        result += " ";
        result += this.data.lyrics[i].text;
      }
      result = result.trim().toLowerCase();
      return result;
    },
    calculateResult(recognizedText) {
      recognizedText = recognizedText.toLowerCase();
      console.log("recognized text", recognizedText);
      let complete_lyrics = this.mergeLyrics();
      console.log("complete_lyrics", complete_lyrics);
      let percentage = this.matchPercentage(complete_lyrics, recognizedText);
      console.log("percentage", percentage);
      //   this.matchPercentage = percentage + "%";
      return percentage;
      //   if (percentage > 50) {
      //     this.recognizedText = "";
      //     this.lyrics_index += 1;
      //     this.updateLyrics();
      //   }
    },
    postScore() {
      let scoreData = {
        song_id: this.$route.params.id,
        score: this.matchPercentage.toString(),
        // user_id: this.user_id
      };
      console.log("scoreData", scoreData);

      this.$axios
        .$post("/scores", scoreData)
        .then(response => {
          console.log("Success!");
          console.log({
            response
          });
          // this.$router.push({
          //     path: '/'
          // }) // -> /user
        })
        .catch(error => {
          console.log({
            error
          });
        });
    }
  }
};
</script>
