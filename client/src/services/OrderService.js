import Api from '@/services/Api'

export default {
  orders () {
    return Api().get('/orders')
  },
  orderHistory () {
    return Api().get('/order-histories')
  },
  placeOrder (order) {
    return Api().post('/order', order)
  },
  fulfillOrder (id) {
    return Api().get(`/order/${id}/fulfill`)
  },
  cancelOrder (id) {
    return Api().get(`/order/${id}/cancel`)
  }
}
