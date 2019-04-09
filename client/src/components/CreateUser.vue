<template>
  <div class="container-fluid">
    <!-- Sign Up -->
    <div class="row justify-content-center create-user">
      <div class="col-3">
        <h4 class="mb-4">Create new user</h4>
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
            <input type="number" class="form-control form-control-sm" name="phone" v-model="phone">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control form-control-sm" name="email" v-model="email">
          </div>
          <div class="form-group">
            <label>Select Role</label>
            <select name="role" class="form-control form-control-sm" v-model="role">
              <option :value="role.id" v-for="role in roles" :key="role.id">{{ role.title }}</option>
            </select>
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
import UserService from '@/services/UserService'
import RoleService from '@/services/RoleService'

export default {
  name: 'CreateUser',
  data () {
    return {
      roles: '',
      fullname: '',
      address: '',
      phone: '',
      email: '',
      role: '',
      password: '',
      confirm_password: ''
    }
  },
  async created () {
    this.roles = (await RoleService.roles()).data
  },
  methods: {
    async register () {
      try {
        if (this.confirm_password !== this.password) {
          throw new Error('Confirm password should match with password.')
        }

        const response = await UserService.store({
          name: this.fullname,
          address: this.address,
          phone: this.phone,
          role_id: this.role,
          email: this.email,
          password: this.password
        })

        if (response) {
          if (response.status === 200) {
            this.$notify({
              group: 'foo',
              type: 'success',
              text: `User ${this.fullname} created successfully.`
            })

            // clear form
            this.fullname = ''
            this.address = ''
            this.phone = ''
            this.email = ''
            this.password = ''
            this.confirm_password = ''
            this.role = ''

            this.$router.push({ name: 'admin' })
          }
        }
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          text: error.toString()
        })
      }
    }
  }
}
</script>

<style scoped>
.create-user {
  margin-top: 100px;
}
</style>
