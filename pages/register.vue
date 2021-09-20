<template>
  <v-container>
    <h1>Register</h1>
    <UserAuthForm buttonText="Register" :submitForm='registerUser' hasName='true' hasRole='true' />
  </v-container>
</template>

<script>
export default {
  auth: false,
  component: {
    
  },
  methods: {
    async registerUser(registrationInfo){
      try{
        await this.$axios.post('/users/signup',registrationInfo)
        this.$auth.loginWith('local', {
        data: registrationInfo
      })
      this.$router.push('login');
      }catch(e){
        alert('Registration Error: ' + e)
      }
    }
  }
}
</script>
