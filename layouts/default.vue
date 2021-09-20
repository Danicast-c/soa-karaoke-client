<template>
  <v-app>
    <v-app-bar app color="green">
      <v-btn text to="/"><h1>Karaoke 99</h1></v-btn>
      <v-spacer/>
      <div v-if="$auth.loggedIn">
        <v-btn text @click="logout()">Logout</v-btn> 
      </div>
      <div v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>

export default {
  methods: {
    logout(){
      this.$auth.logout()
      alert('logged in? '+this.$auth.loggedIn)
      this.$router.push('login');
    }
  }
}
</script>
