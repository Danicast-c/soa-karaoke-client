<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css?family=Londrina+Outline"
      rel="stylesheet"
    />
    <v-app-bar app color="blue-grey darken-4">
      <v-btn text to="/">
        <h1 class="karaoke_logo">Karaoke 99</h1>
      </v-btn>
      <v-spacer />
      <div v-if="$auth.loggedIn">
        <v-btn text to="/stats">
          Statistics
          <v-icon>mdi-chart-bar</v-icon>
        </v-btn>
          
        <v-btn
          v-if="$auth.user.role != 'regular' && $route.name == 'index'"
          text
          to="/new_song"
          >New Song</v-btn
        >
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

<style>
.karaoke_logo {
  font-size: 5vmin;
  --interval: 5s;
  display: block;
  text-shadow: 0 0 10px var(--color1), 0 0 20px var(--color2),
    0 0 40px var(--color3), 0 0 80px var(--color4);
  will-change: filter, color;
  filter: saturate(60%);
  animation: flicker steps(100) var(--interval) 1s infinite;
  color: yellow;
  --color1: yellow;
  --color2: lime;
  --color3: green;
  --color4: darkgreen;
  font-family: Londrina Outline;
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
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("login");
    }
  }
};
</script>
