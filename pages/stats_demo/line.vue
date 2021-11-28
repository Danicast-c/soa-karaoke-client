<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="updateData()">Randomize</button>
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
      datacollection: null
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    updateData() {
      let randomArray1 = this.datacollection.datasets[0].data;
      let randomArray2 = this.datacollection.datasets[1].data;
      randomArray1.splice(0, 1);
      randomArray1.push(this.getRandomInt());
      randomArray2.splice(0, 1);
      randomArray2.push(this.getRandomInt());
      this.datacollection = {
        labels: [...Array(10).keys()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f8797999",
            data: randomArray1,
            borderwidth: 10,
            borderColor: "#f87979"
          },
          {
            label: "Data One",
            backgroundColor: "#f879FF99",
            data: randomArray2,
            borderwidth: 10,
            borderColor: "#f879FF"
          }
        ]
      };
    },
    fillData() {
      let randomArray1 = [];
      let randomArray2 = [];
      for (var i = 0; i < 10; i++) {
        randomArray1.push(this.getRandomInt());
        randomArray2.push(this.getRandomInt());
      }
      this.datacollection = {
        labels: [...Array(10).keys()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f8797999",
            data: randomArray1,
            borderwidth: 10,
            borderColor: "#f87979"
          },
          {
            label: "Data One",
            backgroundColor: "#f879FF99",
            data: randomArray2,
            borderwidth: 10,
            borderColor: "#f879FF"
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
