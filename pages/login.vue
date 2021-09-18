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
    async loginUser(loginInfo){
      try {
        await this.$auth.loginWith('local',{
        data: loginInfo
        })
      } catch (e) {
        alert('Error in sign in.')
      }
    }
  }
}
</script>
