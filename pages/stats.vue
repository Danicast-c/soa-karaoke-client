<template>
  <div>
    <v-container>
    <!-- <button @click="updateStatsChart()">Update</button> -->

    <h1>Played Songs Over Time</h1>
    <line-chart v-if="loaded" :chart-data="statsChartData" :height="150" />

    <h1>Personal Highscores</h1>
    <bar-chart
      v-if="loaded"
      :chartdata="highscoresChartData"
      :options="highscoresChartOptions"
      :height="150"
    />

    <h1>Most Played Artists</h1>
    <pie-chart
      v-if="loaded"
      :chartdata="artistsChartData"
      :options="artistsChartOptions"
      :height="150"
    />
    </v-container>
  </div>
</template>

<script>
// import LineChart from './LineChart.js'

export default {
  components: {
    // LineChart
  },
  data() {
    return {
      loaded: false,
      // statsdatacollection: null,
      userStats: [],
      highscores: [],
      statsChartData: null,
      highscoresChartData: null,
      highscoresChartOptions: null,
      artistsChartData: null,
      artistsChartOptions: null
    };
  },
  async mounted() {
    this.loaded = false;
    const responsehighscores = await this.$axios.$get("/scores/top/highscores");
    this.highscores = responsehighscores;
    if (responsehighscores.length > 0) {
      this.highscoresChartData = {
        labels: this.highscores.map(score => score.title),
        datasets: [
          {
            label: "Highscores",
            // backgroundColor: "rgba(255,99,132,0.2)",
            // borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            // hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBackgroundColor: "rgba(125,125,125,0.4)",
            // hoverBorderColor: "rgba(255,99,132,1)",
            data: this.highscores.map(score => score.highscore),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
          }
        ]
      };
    }
    const responseuserstats = await this.$axios.$get("/scores/user/stats");
    this.userStats = responseuserstats;
    if (responseuserstats.length > 0) {
      this.statsChartData = {
        labels: this.userStats.map(stat => stat.date),
        datasets: [
          {
            label: "Played Songs",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,200)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: this.userStats.map(stat => stat.total),
            
           
          }
        ]
      };
    }
    const responseartists = await this.$axios.$get("/scores/top/artists");
    console.log("responseartists", responseartists);
    if (responseartists.length > 0) {
      this.artistsChartData = {
        labels: responseartists.map(artist => artist.artist),
        datasets: [
          {
            label: "Played Songs",
            // backgroundColor: "rgba(255,99,132,0.2)",
            // borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(125,125,125,0.4)",
            // hoverBorderColor: "rgba(255,99,132,1)",
            data: responseartists.map(artist => artist.total),
             backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
          }
        ]
      };
    }

    this.loaded = true;
  },
  methods: {
    // updateAllCharts: async function() {
    //   this.getUserData().then(() => {
    //     this.updateStatsChart();
    //     this.updateHighscoresChart();
    //     console.log("loaded", this.highscoresChartData);
    //   });
    //   this.loaded = true;
    // // },
    // updateStatsChart() {
    //   let chartViews = this.userStats.map(stat => stat.total);
    //   let chartDates = this.userStats.map(stat => stat.date);
    //   this.statsdatacollection = {
    //     labels: chartDates,
    //     datasets: [
    //       {
    //         label: "Played songs",
    //         backgroundColor: "#f8797999",
    //         data: chartViews,
    //         borderwidth: 10,
    //         borderColor: "#f87979"
    //       }
    //     ]
    //   };
    //   this.highscoresChartData = {
    //     labels: chartDates,
    //     datasets: [
    //       {
    //         label: "Played songs",
    //         backgroundColor: "#f8797999",
    //         data: chartViews,
    //         borderwidth: 10,
    //         borderColor: "#f87979"
    //       }
    //     ]
    //   };
    // // },
    // getUserData: async function() {
    //   let responseuserStats = await this.$axios.$get("/scores/user/stats");
    //   this.userStats = responseuserStats;
    //   let responsehighscores = await this.$axios.$get("/scores/top/highscores");
    //   this.highscores = responsehighscores;
    //   // console.log("userStats", this.userStats);
    // // },
    // updateHighscoresChart: function() {
    //   console.log("highscoresChartData #####", this.highscoresChartData);
    //   this.highscoresChartData.labels.push("casa91");
    //   this.highscoresChartData.datasets.push({
    //     label: "Highscores",
    //     data: [99],
    //     backgroundColor: "#2f4b7c"
    //   });
    // }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
