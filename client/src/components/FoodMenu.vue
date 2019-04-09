<template>
  <div class="container-fluid">
    <!-- Page -->
    <div class="row">
      <div class="container-fluid">
        <!-- Page Title -->
        <div class="row menu-navigation">
          <div class="col">
            <div class="page-title">
              <h6 class="text-primary">Food Menu</h6>
            </div>
          </div>

          <!-- Menus -->
          <div class="col">
            <div class="page-title-menus">
              <nav class="nav admin-nav justify-content-end">
                <div class="nav-link p-0">
                  <form action method="post">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      v-model="search"
                      placeholder="Search Food..."
                    >
                  </form>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <!-- Page Title -->

        <!-- Food Menu -->
        <div class="row">
          <!-- Food Items -->
          <div class="col-9" v-if="searchedFoods == null">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center bg-light"
              >
                Food
                <span class="badge badge-primary badge-pill">{{ foods.length }}</span>
              </li>
              <div class="items">
                <div
                  class="list-group-item list-group-item-action flex-column align-items-start"
                  v-for="food in foods"
                  :key="food.id"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">{{ food.title }}</h6>
                    <small>{{ food.price }}</small>
                    <button
                      class="badge badge-dark badge-pill btn"
                      title="Add to Order list"
                      @click="addOrder(food)"
                    >+</button>
                  </div>
                  <small>{{ food.description }}</small>
                </div>
              </div>
            </ul>
          </div>
          <!-- Search result for foods -->
          <div class="col-9" v-else>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center bg-light"
              >
                Search result for : '{{ this.search }}'
                <span
                  class="badge badge-primary badge-pill"
                >{{ searchedFoods.length }}</span>
              </li>
              <div class="items">
                <div
                  class="list-group-item list-group-item-action flex-column align-items-start"
                  v-for="food in searchedFoods"
                  :key="food.id"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">{{ food.title }}</h6>
                    <small>{{ food.price }}</small>
                    <button
                      class="badge badge-dark badge-pill btn"
                      title="Add to Order list"
                      @click="addOrder(food)"
                    >+</button>
                  </div>
                  <small>{{ food.description }}</small>
                </div>
              </div>
            </ul>
          </div>
          <!-- Food Items -->

          <!-- Order Detail -->
          <div class="col-3">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center bg-light"
              >
                <span>Order Detail</span>
                <button
                  class="btn badge badge-danger"
                  @click="removeOrders"
                  v-if="orders.length"
                >Remove All Order</button>
              </li>
              <div class="order-list">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                  v-for="order in orders"
                  :key="order.details.id"
                >
                  {{ order.details.title }}
                  <span
                    class="badge badge-primary badge-pill"
                  >{{ order.quantity }}</span>
                  <button
                    class="badge badge-dark badge-pill btn ml-2"
                    title="Remove"
                    @click="removeOrder(order.details)"
                  >-</button>
                </li>
              </div>
              <li
                class="list-group-item d-flex justify-content-between align-items-center bg-light"
              >
                <span>Total</span>
                <span>Rs. {{ getTotal }}</span>
              </li>
              <li class="list-group-item align-items-center bg-light" v-if="orders.length">
                <button class="btn btn-info float-right btn-sm" @click="placeOrder">Place Order</button>
              </li>
            </ul>
          </div>
          <!-- Order Detail -->
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
import OrderService from "@/services/OrderService";

export default {
  name: "Food",
  async created() {
    const now = new Date().getHours();
    this.canPlaceOrder =
      now >= this.$store.state.config.startAt &&
      now <= this.$store.state.config.endAt;
    this.foods = (await FoodService.foods()).data;
  },
  watch: {
    search: {
      async handler(query) {
        if (query.trim()) {
          this.searchedFoods = (await FoodService.search(query)).data;
          if (!this.searchedFoods.length) {
            this.$notify({
              group: "foo",
              type: "error",
              text: `Search result for ${this.search} is not found.`
            });
          }
        } else {
          this.searchedFoods = null;
        }
      }
    }
  },
  data() {
    return {
      search: "",
      foods: "",
      searchedFoods: null,
      orders: [],
      canPlaceOrder: false
    };
  },
  methods: {
    addOrder(food) {
      const orderIndex = this.orders.findIndex(f => {
        return f.details.title === food.title;
      });

      if (orderIndex === -1) {
        this.orders.push({
          details: food,
          quantity: 1
        });
      } else {
        if (
          this.orders[orderIndex].quantity <
          this.orders[orderIndex].details.quantity
        ) {
          this.orders[orderIndex].quantity++;
        } else {
          this.$notify({
            group: "foo",
            type: "error",
            text: "Maximum food quantity reached"
          });
        }
      }
    },

    removeOrder(food) {
      if (this.orders.length !== 0) {
        const orderIndex = this.orders.findIndex(f => {
          return f.details.title === food.title;
        });

        if (this.orders[orderIndex].quantity <= 1) {
          this.orders.splice(orderIndex, 1);
        } else {
          this.orders[orderIndex].quantity--;
        }
      }
    },

    async placeOrder() {
      if (this.orders.length) {
        let foodCart = [];
        const user = this.$store.state.user;

        this.orders.forEach(order => {
          foodCart.push({
            food_id: order.details.id,
            user_id: user.id,
            quantity: order.quantity,
            unit_price: order.details.price,
            canteen_manager_id: order.details.canteen_manager_id,
            total_amount: Math.ceil(order.details.price * order.quantity),
            status: "pending"
          });
        });

        // place the order
        try {
          const order = await OrderService.placeOrder(foodCart);
          if (order !== undefined && order.data && order.data.message) {
            this.foods = (await FoodService.foods()).data;
            this.orders = [];
            this.$notify({
              group: "foo",
              type: "success",
              text: order.data.message
            });
          } else {
            this.orders = [];
          }
        } catch (error) {
          this.$notify({
            group: "foo",
            type: "error",
            text: error.toString()
          });
        }
      }
    },
    removeOrders() {
      this.orders = [];
    }
  },
  computed: {
    getTotal() {
      let total = 0;
      this.orders.forEach(food => {
        let subTotal = food.details.price * food.quantity;
        total += subTotal;
      });

      return Math.ceil(total);
    }
  }
};
</script>
