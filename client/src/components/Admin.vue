<template>
  <div class="container-fluid">
    <!-- Page -->
    <div class="row">
      <div class="container-fluid">
        <!-- Page Title -->
        <div class="row menu-navigation">
          <div class="col">
            <div class="page-title">
              <h6 class="text-primary">Users</h6>
            </div>
          </div>

          <!-- Menus -->
          <div class="col">
            <div class="page-title-menus">
              <nav class="nav admin-nav justify-content-end">
                <div class="nav-link p-0">
                  <router-link to="/users/create" class="text-capitalize btn btn-primary btn-sm">Create User</router-link>
                </div>
                <!-- <div class="nav-link p-0 ml-2">
                                    <a class="text-capitalize btn btn-primary btn-sm" href="#">Food Manangement</a>
                </div>-->
              </nav>
            </div>
          </div>
        </div>
        <!-- Page Title -->

        <!-- Page -->
        <div class="row">
          <div class="col">
            <div class="page">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col" width="160">Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.address }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>
                      <router-link :to="`/users/${user.id}/edit`" class="text-capitalize btn btn-success btn-sm">Edit</router-link>
                      <button class="text-capitalize btn btn-danger ml-1 btn-sm" @click="deleteUser(user.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Page -->
      </div>
    </div>
    <!-- Page -->
  </div>
</template>

<script>
/* eslint-disable */
import UserService from "@/services/UserService";
export default {
  name: "Admin",
  data() {
    return {
      users: ''
    };
  },
  async created () {
    this.users = (await UserService.users()).data
  },
  methods: {
    async editUser (id) {
      (await UserService.find(id)).data
    },
    async deleteUser (id) {
      const response = (await UserService.delete(id))
      if (response.data !== undefined) {
        this.$notify({
          group: 'foo',
          type: 'success',
          text: response.data.message
        })
        this.users = (await UserService.users()).data
      }
    }
  }
};
</script>
