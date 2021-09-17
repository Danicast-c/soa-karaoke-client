<template>
  <v-container>
    <h1>Register</h1>
    <UserAuthForm buttonText="Register" :submitForm='registerUser'/>
  </v-container>
</template>

<script>
export default {
  component: {
    
  },
  methods: {
    registerUser(registerinfo){
      alert("Boton presionado")
    }
  }
}
</script>
