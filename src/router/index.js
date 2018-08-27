import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../view/GoodsList.vue'
import cart from '../view/Cart.vue'
import address from '../view/Address.vue'
import OrderConfirm from '../view/OrderConfirm.vue'
import OrderSuccess from '../view/OrderSuccess.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/order-confirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/order-success',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
