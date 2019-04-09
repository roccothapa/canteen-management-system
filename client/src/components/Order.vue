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
              <h6 class="text-primary">Today's Order</h6>
            </div>
          </div>

          <!-- Menus -->
          <div class="col"></div>
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
                    <th scope="col">Ordered By</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col" width="260">Ordered At</th>
                    <th scope="col" width="160">Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.food.title }}</td>
                    <td>{{ order.user.name }}</td>
                    <td>{{ order.quantity }}</td>
                    <td>{{ order.unit_price }}</td>
                    <td>{{ order.total_amount }}</td>
                    <td>
                      <span :class="order.status">{{ order.status }}</span>
                    </td>
                    <td>{{ (new Date(order.created_at)).toUTCString() }}</td>
                    <td>
                      <button
                        class="text-capitalize btn btn-success btn-sm"
                        @click="fulfillOrder(order.id)"
                      >Fulfill</button>
                      <button
                        class="text-capitalize btn btn-danger ml-1 btn-sm"
                        @click="cancelOrder(order.id)"
                      >Cancel</button>
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
import OrderService from "@/services/OrderService"
import FoodService from "@/services/FoodService"

export default {
  name: "Order",
  data() {
    return {
      orders: "",
      totalUncompletedOrder: 0
    };
  },
  async created() {
    this.orders = (await OrderService.orders()).data
    if (this.$store.state.user.role[0].role === 'canteen_manager') {
      this.totalUncompletedOrder = (await FoodService.totalUncompletedOrder()).data
    }
  },
  methods: {
    async fulfillOrder(id) {
      const response = await OrderService.fulfillOrder(id);
      if (response !== undefined && response.data !== undefined) {
        this.$notify({
          group: "foo",
          type: "success",
          text: "Order fulfilled successfully"
        });
        this.orders = (await OrderService.orders()).data;
      } else {
        this.$notify({
          group: "foo",
          type: "error",
          text: "Unable to fulfill order"
        });
      }
    },
    async cancelOrder(id) {
      const response = await OrderService.cancelOrder(id);
      if (response !== undefined && response.data !== undefined) {
        this.$notify({
          group: "foo",
          type: "success",
          text: "Order canceled successfully"
        });
        this.orders = (await OrderService.orders()).data;
      } else {
        this.$notify({
          group: "foo",
          type: "error",
          text: "Unable to fulfill order"
        });
      }
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
  background-color: #28a745;
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
  background-color: #dc3545;
}
</style>
