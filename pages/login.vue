<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm buttonText="Login" :submitForm='loginUser'/>
  </v-container>
</template>

<script>
export default {
  component: {
    
  },
  methods: {
    loginUser(logininfo){
      alert("Boton presionado")
    }
  }
}
</script>
