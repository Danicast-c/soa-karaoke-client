<template>
<div>
    <!-- <link href='https://fonts.googleapis.com/css?family=Sriracha' rel='stylesheet'> -->
    <link href="https://fonts.googleapis.com/css?family=Bad+Script" rel="stylesheet" />

    <!-- <v-row justify="center" align="center"> -->

    <v-card class="karaoke_banner_section" id="karaoke_banner_div">
        <!-- <v-col cols="12" sm="8" md="6"> -->
        <v-card class="logo py-4 d-flex justify-center hover">
            <v-card-title>
                <h1>{{ data.title }}</h1>
            </v-card-title>

            <h2>{{ data.artist }}</h2>
        </v-card>
        <!-- Music Player -->

        <div class="karaoke_banner">
            <div class="neon-sign" v-html="lyrics"></div>
        </div>

        <!-- <div class="jumbotron">
                <x-sign>PRUEBA gfhfghfghfghfghfgfghfghfgh fggh sdfsdfsdf sdfsdfsd sdfsdf</x-sign>
            </div> -->

        <tr>
            <th class="karaoke_player">
                <vue-plyr ref="plyr">
                    <audio controls crossorigin playsinline>
                        <source src="mp3" type="audio/mp3" />
                    </audio>
                </vue-plyr>
            </th>
            <th>
                <v-btn @click="toggleFullScreen()" large light style="height:50px">
                    <v-icon style="height:100%"> mdi-fullscreen</v-icon>
                </v-btn>

            </th>
        </tr>

        <h3>
            Current time: {{ currentTime }} / Lyrics index: {{ lyrics_index }} /
            {{ lyrics_max_index }}
        </h3>
    </v-card>
    <!-- </v-col> -->

    <!-- </v-row> -->
</div>
</template>

<style>
.karaoke_banner_section {
    height: 75%;
    /* display: grid; */
    min-height: 500px;

}

.karaoke_banner {
    padding: 1rem;
    margin: 2rem;
    /* background-color: #1b2e41; */
    min-height: 400px;
    background: #090000;
    font-size: 10vmin;
    text-align: center;
    display: grid;
    align-content: center;
    justify-content: center;
    height: 75%;
    padding: 1em;
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
    /* font-size: 30px; */
    color: lightyellow;
    --color1: yellow;
    --color2: gold;
    --color3: orange;
    --color4: darkred;
    font-family: Bad Script;
    /* font-family: Sriracha; */
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
        };
    },
    mounted() {
        this.getSong();
        this.$refs.plyr.player.on(
            "timeupdate",
            () => (this.currentTime = this.$refs.plyr.player.currentTime)
        );
        this.$refs.plyr.player.on("timeupdate", () => this.updateLyrics());
    },
    methods: {
        getSong: async function () {
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
                sources: [{
                    src: this.mp3,
                    type: "audio/mp3",
                }, ],
            };
        },
        updateLyrics: function () {
            let lyric_position = this.data.lyrics[this.lyrics_index];
            if (
                lyric_position.startTime - 1 <= this.currentTime &&
                lyric_position.endTime > this.currentTime
            ) {
                this.lyrics = lyric_position.text;
            } else if (
                lyric_position.startTime < this.currentTime &&
                lyric_position.endTime < this.currentTime
            ) {
                this.lyrics = "";
                if (this.lyrics_index < this.lyrics_max_index) this.lyrics_index += 1;
            } else if (
                lyric_position.startTime > this.currentTime &&
                lyric_position.endTime > this.currentTime
            ) {
                this.lyrics = "";
                if (this.lyrics_index > 0) this.lyrics_index -= 1;
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
    },
};
</script>
