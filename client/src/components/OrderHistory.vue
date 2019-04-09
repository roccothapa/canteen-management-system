<template>
  <div class="container-fluid">
    <div class="row mt-4" v-if="$store.state.user.role[0].role === 'canteen_manager'">
      <div class="col">
        <h3>Total Uncompleted Order <span class="badge badge-secondary">{{ totalUncompletedOrder }}</span></h3>
      </div>
    </div>
    <!-- Page -->
    <div class="row">
      <div class="container-fluid">
        <!-- Page Title -->
        <div class="row menu-navigation">
          <div class="col">
            <div class="page-title">
              <h6 class="text-primary">Order History</h6>
            </div>
          </div>

          <!-- Menus -->
          <div class="col">
            <!-- <div class="page-title-menus">
              <nav class="nav admin-nav justify-content-end">
                <div class="nav-link p-0">
                  <a class="text-capitalize btn btn-primary btn-sm" href="#">Create User</a>
                </div>
              </nav>
            </div>-->
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
                    <th scope="col">Food</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col" width="260">Ordered At</th>
                    <th scope="col" width="260">FullFilled At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.food.title }}</td>
                    <td>{{ order.quantity }}</td>
                    <td>{{ order.unit_price }}</td>
                    <td>{{ order.total_amount }}</td>
                    <td>
                      <span :class="order.status">{{ order.status }}</span>
                    </td>
                    <td>{{ (new Date(order.created_at)).toUTCString() }}</td>
                    <td>{{ (new Date(order.updated_at)).toUTCString() }}</td>
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
import OrderService from "@/services/OrderService"
import FoodService from "@/services/FoodService"

export default {
  name: "OrderHistory",
  data() {
    return {
      orders: "",
      totalUncompletedOrder: 0
    };
  },
  async created() {
    this.orders = (await OrderService.orderHistory()).data
    if (this.$store.state.user.role[0].role === 'canteen_manager') {
      this.totalUncompletedOrder = (await FoodService.totalUncompletedOrder()).data
    }
  }
};
</script>

<style scoped>
.pending {
  padding: 2px 10px !important;
  font-weight: 500;
  font-size: 12px;
  height: auto !important;
  line-height: initial;
  border: 0;
  color: #fff;
  border-radius: 10rem;
  background-color: #6c757d;
}

.completed {
  padding: 2px 10px !important;
  font-weight: 500;
  font-size: 12px;
  height: auto !important;
  line-height: initial;
  border: 0;
  color: #fff;
  border-radius: 10rem;
  background-color: #28a745
}

.canceled {
  padding: 2px 10px !important;
  font-weight: 500;
  font-size: 12px;
  height: auto !important;
  line-height: initial;
  border: 0;
  color: #fff;
  border-radius: 10rem;
  background-color: #dc3545
}
</style>
