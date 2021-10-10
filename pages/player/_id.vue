<template>
<div>
    <link href='https://fonts.googleapis.com/css?family=Sriracha' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css?family=Bad+Script" rel="stylesheet" />
    <div class="karaoke_banner_section" id="karaoke_banner_div" @dblclick="toggleFullScreen()" >
        <div class="song_title">
            <h1>
                {{ data.title }}
            </h1>
            <h3>
                {{ data.artist }}
            </h3>
        </div>

        <div class="karaoke_banner" >
            <div class="neon-sign" v-html="lyrics"></div>
        </div>

        <tr>
            <th class="karaoke_player">
                <vue-plyr ref="plyr" class="karaoke_player">
                    <audio controls crossorigin playsinline>
                        <source src="mp3" type="audio/mp3" />
                    </audio>
                </vue-plyr>
            </th>
            <th>
                <v-btn @click="toggleFullScreen()" large dark style="background-color: #090000;">
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
    text-shadow:
        0 0 10px var(--color1),
        0 0 20px var(--color2),
        0 0 40px var(--color3),
        0 0 80px var(--color4);
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

.plyr--audio .plyr__controls {
    background-color: #090000;
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
