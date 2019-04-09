<template>
  <div class="container-fluid">
    <!-- Page -->
    <div class="row">
      <div class="container-fluid">
        <!-- Page Title -->
        <div class="row menu-navigation">
          <div class="col">
            <div class="page-title">
              <h6 class="text-primary">Foods</h6>
            </div>
          </div>

          <!-- Menus -->
          <div class="col">
            <div class="page-title-menus">
              <nav class="nav admin-nav justify-content-end">
                <div class="nav-link ml-3 p-0">
                  <router-link
                    to="/food/add"
                    class="btn btn-primary btn-sm"
                    title="Add Food"
                  >Add Food</router-link>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <!-- Page Title -->

        <!-- Food Menu -->
        <div class="row">
          <div class="col">
            <div class="page">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">price</th>
                    <th scope="col">Description</th>
                    <th scope="col" width="160">Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="food in foods" :key="food.id">
                    <td>{{ food.title }}</td>
                    <td>{{ food.quantity }}</td>
                    <td>{{ food.price }}</td>
                    <td>{{ food.description }}</td>
                    <td>
                      <router-link
                        :to="`/food/${food.id}/edit`"
                        class="text-capitalize btn btn-success btn-sm"
                      >Edit</router-link>
                      <button
                        class="text-capitalize btn btn-danger ml-1 btn-sm"
                        @click="deleteFood(food.id)"
                      >Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Food Menu -->
    </div>
  </div>
  <!-- Page -->
</template>

<script>
/* eslint-disable */
import FoodService from "@/services/FoodService";

export default {
  name: "Food",
  async created() {
    this.foods = (await FoodService.foods()).data;
  },
  data() {
    return {
      foods: ""
    };
  },
  methods: {
    async deleteFood(id) {
      const response = await FoodService.delete(id);
      if (response !== undefined) {
        this.$notify({
          group: "foo",
          type: "success",
          text: response.data.message
        });
        this.foods.splice(this.foods.indexOf(response.data.food), 1);
      } else {
        this.$notify({
          group: "foo",
          type: "error",
          text: "Unable to delete food"
        });
      }
    }
  }
};
</script>
