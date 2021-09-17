<template>
  <v-app>
    <v-app-bar app color="green">
      <h1>Karaoke 99</h1>
      <v-spacer/>
      <div v-if="$auth.loggedIn">
        <v-btn text>Logout</v-btn> 
      </div>
      <div v-else>
        <v-btn text to="/login">Login</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
 
}
</script>
