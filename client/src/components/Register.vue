<template>
  <div class="container-fluid login-signup">
    <!-- Sign Up -->
    <div class="row justify-content-center">
      <div class="col-3">
        <h4 class="mb-4">Sign Up</h4>
        <form action="#" method="post" @submit.prevent>
          <div class="form-group">
            <label>Full Name</label>
            <input
              type="text"
              class="form-control form-control-sm"
              name="fullname"
              v-model="fullname"
            >
          </div>
          <div class="form-group">
            <label>Adress</label>
            <input
              type="text"
              class="form-control form-control-sm"
              name="address"
              v-model="address"
            >
            <small class="form-text text-info">* We'll use this address as delivery address.</small>
          </div>
          <div class="form-group">
            <label>Phone No.</label>
            <input
              type="number"
              class="form-control form-control-sm"
              name="phone"
              v-model="phone"
            >
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control form-control-sm" name="email" v-model="email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control form-control-sm"
              name="password"
              v-model="password"
            >
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              class="form-control form-control-sm"
              name="confirm_password"
              v-model="confirm_password"
            >
          </div>
          <button type="submit" class="btn btn-primary btn-sm float-right" @click="register">Sing Up</button>
        </form>
      </div>
    </div>
    <!-- Sign Up -->
  </div>
</template>

<script>
/* eslint-disable */
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: "Register",
  data () {
    return {
        fullname: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: '',
    }
  },
  methods: {
      async register () {
        try {
          if(this.confirm_password !== this.password) {
            throw new Error('Confirm password should match with password.')
          }

          const response = await AuthenticationService.register({
              name: this.fullname,
              address: this.address,
              phone: this.phone,
              email: this.email,
              password: this.password
          });
          
          if(response.data.isJoi !== undefined) {
            for(let msg of response.data.details) {
              this.$notify({
                group: 'foo',
                type: 'error',
                text: msg.message,
              });
            } 
          } else {
            if(response.status === 200) {

              this.$notify({
                group: 'foo',
                type: 'success',
                text: `User ${this.fullname} created successfully.`,
              });

              // clear form
              this.fullname = '';
              this.address = '';
              this.phone = '';
              this.email = '';
              this.password = '';
              this.confirm_password = '';
            }
          }

          } catch (error) {
            this.$notify({
              group: 'foo',
              type: 'error',
              text: error.toString(),
            });
          }
        
      }
  }
}
</script>

<style scoped>
  .login-signup {
    margin-top: 150px;
  }
</style>
