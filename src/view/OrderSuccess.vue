<template>
  <div>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{OrderID}}</span>
            <span>Order total：{{subtotal + 30}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">Cart List</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">Goods List</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['finalSelect'],
    data() {
      return {}
    },
    mounted() {
      this.$emit('pageNow', 'OrderConfirm')
      console.log(JSON.parse(sessionStorage.selected))
      let selectArr = JSON.parse(sessionStorage.selected)
      for (let j = 0; j < selectArr.length; j++) {
        for (let i = 0; i < this.finalSelect.length; i++) {
          if (selectArr[j].productId === this.finalSelect[i].productId) {
            selectArr.splice(j, 1)
          }
        }
      }
      sessionStorage.selected = JSON.stringify(selectArr)
      this.$emit('refreshCart', selectArr)
      console.log(JSON.parse(sessionStorage.selected))
    },
    computed: {
      subtotal() {
        let totalPrice = 0
        this.finalSelect.forEach((i) => {
          totalPrice += i.count * i.prodcutPrice
          i.isselect = false
        })
        return totalPrice
      },
      OrderID() {
        let id = ''
        for (let i = 0; i < 10; i++) {
          id += String(Math.floor(Math.random() * 10))
        }
        return id
      }
    }
  }
</script>
