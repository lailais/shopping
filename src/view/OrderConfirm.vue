<template>
  <div>
    <div class="container">
      <div class="checkout-order">
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li><span>Make</span> payment</li>
            <li><span>Order</span> confirmation</li>
          </ul>
        </div>

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>Order content</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>Order contents</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <!--{{finalSelect}}-->
              <li v-for="(item, index) in finalSelect" :key="index">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img :src="'/static/'+item.prodcutImg" alt="XX">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.prodcutName}}</div>

                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.prodcutPrice}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">{{item.count}}</span>
                      </div>
                    </div>
                    <div class="item-stock item-stock-no">In Stock</div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.count * item.prodcutPrice}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li>
                <span>Item subtotal:</span>
                <span>{{subtotal}}</span>
              </li>
              <li>
                <span>Count total:</span>
                <span>{{counttotal}}</span>
              </li>
              <li>
                <span>shipping:</span>
                <span>30</span>
              </li>
              <li class="order-total-price">
                <span>Order total:</span>
                <span>{{subtotal + 30}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
            <router-link class="btn btn--m" to="/address">Previous</router-link>
          </div>
          <div class="next-btn-wrap">
            <button class="btn btn--m btn--red">
              <router-link to="/order-success">Proceed to payment</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['selectList'],
    data() {
      return {}
    },
    mounted() {
      this.$emit('pageNow', 'OrderConfirm')
    },
    computed: {
      subtotal() {
        let totalPrice = 0
        this.finalSelect.forEach((i) => {
          totalPrice += i.count * i.prodcutPrice
        })
        return totalPrice
      },
      counttotal() {
        let totalcount = 0
        this.finalSelect.forEach((i) => {
          totalcount += i.count
        })
        return totalcount
      },
      finalSelect() {
        var arr = []
        for (var i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i].isselect) {
            arr.push(this.selectList[i])
          }
        }
        this.$emit('finalSelect', arr)
        return arr
      }
    }

  }
</script>
<style scoped>
  .container{
    margin-top: 50px;
  }
</style>
