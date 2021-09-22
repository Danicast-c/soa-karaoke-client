<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <h1>Media Player: id is {{id}}</h1>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return { 
      id: this.$route.params.id,
    }
  },
}
</script>