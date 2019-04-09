import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Admin from '@/components/Admin'
import CreateUser from '@/components/CreateUser'
import EditUser from '@/components/EditUser'
import Food from '@/components/Food'
import FoodMenu from '@/components/FoodMenu'
import AddFood from '@/components/AddFood'
import EditFood from '@/components/EditFood'
import Order from '@/components/Order'
import OrderHistory from '@/components/OrderHistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/users/create',
      name: 'createUser',
      component: CreateUser
    },
    {
      path: '/users/:id/edit',
      name: 'editUser',
      component: EditUser
    },
    {
      path: '/order-foods',
      name: 'orderFood',
      component: FoodMenu
    },
    {
      path: '/foods',
      name: 'foods',
      component: Food
    },
    {
      path: '/food/add',
      name: 'addFood',
      component: AddFood
    },
    {
      path: '/food/:id/edit',
      name: 'editFood',
      component: EditFood
    },
    {
      path: '/orders',
      name: 'order',
      component: Order
    },
    {
      path: '/order-histories',
      name: 'orderHistories',
      component: OrderHistory
    }
  ]
})
