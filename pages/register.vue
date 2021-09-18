<template>
  <v-container>
    <h1>Register</h1>
    <UserAuthForm buttonText="Register" :submitForm='registerUser' hasName='true' />
  </v-container>
</template>

<script>
export default {
  component: {
    
  },
  methods: {
    async registerUser(registrationInfo){
      await this.$axios.post('/register',registrationInfo)
      this.$auth.loginWith('local', {
        data: registrationInfo
      })
    }
  }
}
</script>
