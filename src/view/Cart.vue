<template>
  <div class="container">
    <div class="cart">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>My Cart</span></h2>
      </div>
      <div class="item-list-wrap">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>Items</li>
              <li>Price</li>
              <li>Quantity</li>
              <li>Subtotal</li>
              <li>Edit</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="item in selectList" :key="item.productId">
              <div class="cart-tab-1">
                <div class="cart-item-check">
                  <a href="javascipt:;" class="checkbox-btn item-check-btn" @click="isSelect(item)"
                     :class="{'active':item.isselect}">
                  </a>
                </div>
                <div class="cart-item-pic">
                  <img :src="'/static/'+item.prodcutImg">
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
                  <div class="select-self select-self-open">
                    <div class="select-self-area">
                      <a class="input-sub" @click="doSub(item)">-</a>
                      <span class="select-ipt">{{item.count}}</span>
                      <a class="input-add" @click="doAdd(item)">+</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total">{{item.count * item.prodcutPrice}}</div>
              </div>
              <div class="cart-tab-5">
                <div class="cart-item-opration">
                  <a href="javascript:;" class="item-edit-btn">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-foot-wrap">
        <div class="cart-foot-inner">
          <div class="cart-foot-l">
            <div class="item-all-check">
              <a href="javascipt:;">
                <span class="checkbox-btn item-check-btn" :class="{'allActive':isAll}" @click="changeIsAll">
                <!--<svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>-->
                </span>
                <span>Select all</span>
              </a>
            </div>
          </div>
          <div class="cart-foot-r">
            <div class="item-total">
              Item total: <span class="total-price">{{totalPrice}}</span>
            </div>
            <div class="btn-wrap">
              <router-link class="btn btn--red" to="/address">Checkout</router-link>
            </div>
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
      return {
        isAll: false,
        finalSelect: [],
        mySelect: []
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.fullPath === '/address') {
        if (sessionStorage.name) {
          if (this.haveSelect) {
            next()
          } else {
            alert('未选中任何商品')
          }
        } else {
          alert('请先登录')
        }
      } else {
        next()
      }
    },
    mounted() {
      this.$emit('pageNow', 'Cart')
    },
    methods: {
      isSelect(item) {
        if (!item.isselect) {
          this.$set(item, 'isselect', true)
        } else {
          item.isselect = false
        }
      },
      doAdd(item) {
        item.count++
        this.$emit('selectList', item)
      },
      doSub(item) {
        item.count--
        this.$emit('selectList', item)
      },
      changeIsAll() {
        this.isAll = !this.isAll
        this.selectList.forEach((i) => {
          i.isselect = this.isAll
        })
      }
    },
    computed: {
      totalPrice() {
        let price = 0
        this.selectList.forEach((i) => {
          if (i.isselect) {
            price += i.count * i.prodcutPrice
          }
        })
        return price
      },
      haveSelect() {
        var num = 0
        for (var i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i].isselect) {
            return ++num
          }
        }
      }
    }
  }
</script>
<style>
  @import "../assets/css/checkout.css";

  .input-sub, .input-add {
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }

  .item-quantity .select-self-area {
    background: none;
    border: 1px solid #f0f0f0;
  }

  .item-quantity .select-self-area .select-ipt {
    display: inline-block;
    padding: 0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }

  .active, .allActive {
    background: url("../../static/select.png");
    background-size: cover;
  }
</style>
