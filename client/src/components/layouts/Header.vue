<template>
  <div>
    <div class="container-fluid header">
      <!-- Navigation -->
      <div class="row bg-light border-bottom">
        <div class="col">
          <nav class="navbar navbar-expand-lg navbar-light">
            <router-link to="/login" class="navbar-brand h6 m-0">Canteen Management System</router-link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto"></ul>
              <ul class="navbar-nav">
                <router-link
                  to="/login"
                  class="btn btn-outline-dark btn-sm"
                  v-if="!$store.state.authenticated"
                >Log In</router-link>
                <button
                  class="btn btn-outline-dark btn-sm"
                  @click="logout"
                  v-if="$store.state.authenticated"
                >Log Out</button>
                <router-link
                  to="/register"
                  class="btn btn-outline-dark btn-sm ml-2"
                  v-if="!$store.state.authenticated"
                >Sing Up</router-link>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <!-- Admin Panel Menus -->
      <div class="row border-bottom" v-if="authenticated">
        <nav class="nav admin-nav">
          <router-link
            to="/admin"
            class="nav-link border-right text-capitalize small active">Users</router-link>
          <router-link
            to="/order-foods"
            class="nav-link border-right text-capitalize small">Food Menus</router-link>
          <router-link
            to="/foods"
            class="nav-link border-right text-capitalize small">Food Manangement</router-link>
          <router-link
            to="/orders"
            class="nav-link border-right text-capitalize small">Order Management</router-link>
          <router-link
            to="/order-histories"
            class="nav-link border-right text-capitalize small">Order Histories</router-link>
        </nav>
      </div>
      <!-- Navigation -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    authenticated () {
      return this.$store.state.authenticated
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setConfig', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
