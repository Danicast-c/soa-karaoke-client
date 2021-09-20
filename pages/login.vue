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
        let response = await this.$auth.loginWith('local',{
        data: loginInfo
        })
         console.log(response)
        alert('Correcto :'+ response.data.access_token )
        //this.$auth.strategy.token.set(response.data.access_token)
        alert('token: '+this.$auth.strategy.token.get())
        alert('logged in? '+this.$auth.loggedIn)
        alert('email: '+this.$auth.user.email)
      } catch (e) {
        alert('Error in sign in: '+e)
      }
    }
  }
}
</script>
