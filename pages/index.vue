<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <h1>Main View</h1>
        <div v-if="$auth.loggedIn">
          <h2> {{$auth.email}} </h2>
        </div>
      </v-card>
      <ul>
        <!-- <li v-for="item in songs" v-bind:key="item">
          {{ item.name }}
        </li> -->
      </ul>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return { 
      songs: [
        {name: 'La gasolina'},
        {name: 'La bandolera'},
      ]
    }
  },
}
</script>