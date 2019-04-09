<template>
  <div class="container-fluid">
    <!-- Sign Up -->
    <div class="row justify-content-center create-user">
      <div class="col-3">
        <h4 class="mb-4">Edit User : {{ fullname }} </h4>
        <form @submit.prevent>
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
          <button type="submit" class="btn btn-primary btn-sm float-right" @click="update()">Update</button>
        </form>
      </div>
    </div>
    <!-- Sign Up -->
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  name: 'EditUser',
  data () {
    return {
      fullname: '',
      address: '',
      phone: '',
      email: ''
    }
  },
  async created () {
    const user = (await UserService.getUser(this.$route.params.id)).data

    this.fullname = user.name
    this.address = user.address
    this.phone = user.phone
    this.email = user.email
    this.email = user.email
  },
  methods: {
    async update () {
      try {
        const response = await UserService.update(this.$route.params.id, {
          name: this.fullname,
          address: this.address,
          phone: this.phone,
          email: this.email
        })

        if (response) {
          if (response.status === 200) {
            this.$notify({
              group: 'foo',
              type: 'success',
              text: `User ${this.fullname} updated successfully.`
            })

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
