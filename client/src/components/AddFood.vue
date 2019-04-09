<template>
  <div class="container-fluid">
    <!-- Sign Up -->
    <div class="row justify-content-center add-food">
      <div class="col-3">
        <h4 class="mb-4">Add New Food</h4>
        <form @submit.prevent>
          <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control form-control-sm" v-model="title">
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="number" step="any" class="form-control form-control-sm" v-model="price">
          </div>
          <div class="form-group">
            <label>Quantity</label>
            <input type="number" class="form-control form-control-sm" v-model="quantity">
          </div>
          <div class="form-group">
            <label>description</label>
            <textarea cols="10" class="form-control form-control-sm" rows="5" v-model="description"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-sm float-right" @click="store">Save</button>
        </form>
      </div>
    </div>
    <!-- Sign Up -->
  </div>
</template>

<script>
import FoodService from "@/services/FoodService";

export default {
  name: 'AddFood',
  data() {
    return {
      title: '',
      price: '',
      quantity: '',
      description: ''
    };
  },
  methods: {
    async store() {
      try {
        const response = await FoodService.store({
          title: this.title,
          price: this.price,
          quantity: this.quantity,
          description: this.description,
          canteen_manager_id: this.$store.state.user.id
        });

        if (response) {
          if (response.status === 200) {
            this.$notify({
              group: 'foo',
              type: 'success',
              text: `Food Added successfully`
            });
            this.$router.push({ name: 'foods' })
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
.add-food {
  margin-top: 100px;
}
</style>
