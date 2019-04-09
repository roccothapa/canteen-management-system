<template>
  <div class="container-fluid login-signup">
    <!-- Login -->
    <div class="row justify-content-center">
      <div class="col-3">
        <h4 class="mb-4">Log In</h4>
        <form @submit.prevent>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control form-control-sm" v-model="email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control form-control-sm"
              v-model="password"
            >
          </div>
          <button type="submit" class="btn btn-dark btn-sm float-right" @click="login">Log In</button>
        </form>
      </div>
    </div>
    <!-- Login -->
  </div>
</template>

<script>
/* eslint-disable */
import AuthenticationService from "@/services/AuthenticationService";
import ConfigService from "@/services/ConfigService";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

        const config = await ConfigService.index()

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setConfig', config.data)
      
        switch(response.data.user.role[0].role) {
          case 'admin':
            this.$router.push({ name: 'admin' })
            break;
          
          case 'canteen_manager':
            this.$router.push({ name: 'admin' })
            break;
          
          case 'user':
            this.$router.push({ name: 'foods' })
            break;
          
          default:
            this.$router.push({ name: 'foods' })
            break;
        }
       

      } catch (error) {
        
        if(error.message != undefined) {
          this.$notify({
            group: "foo",
            type: "error",
            text: error.message
          });
        }

        if (error.response != undefined && error.response.data.error) {
          this.$notify({
            group: "foo",
            type: "error",
            text: error.response.data.error
          });
        } else {
          this.$notify({
            group: "foo",
            type: "error",
            text: error.toString()
          });
        }
      }
    }
  }
};
</script>

<style scoped>
  .login-signup {
    margin-top: 150px;
  }
</style>
