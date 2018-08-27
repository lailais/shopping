<template>
  <div>
    <div class="checkout-page">
      <div class="container">
        <div class="checkout-addr">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
          </div>
          <!-- process step -->
          <div class="check-step">
            <ul>
              <li class="cur"><span>Confirm</span> address</li>
              <li><span>View your</span> order</li>
              <li><span>Make</span> payment</li>
              <li><span>Order</span> confirmation</li>
            </ul>
          </div>

          <div class="page-title-normal checkout-title">
            <h2><span>Shipping address</span></h2>
          </div>
          <div class="addr-list-wrap">
            <div class="addr-list">
              <ul>
                <li v-for="(item, index) in myAddArr" :key="index" @click="active=index">
                  <dl>
                    <dt>recipient:{{item.name}}</dt>
                    <dd class="address">Receiving address:{{item.address}}</dd>
                    <dd class="tel">
                      Addressee phone:{{item.phone}}
                    </dd>
                  </dl>
                  <div class="addr-opration addr-del">
                    <a href="javascript:;" class="addr-del-btn">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="addr-opration addr-set-default">
                    <a href="javascript:;" class="addr-set-default-btn"><i>Set default</i></a>
                  </div>
                  <div class="addr-opration addr-default" v-if="active===index">Default address</div>
                </li>
                <li class="addr-new" @click="show=true">
                  <div class="add-new-inner">
                    <i class="icon-add">
                      +
                    </i>
                    <p>Add new address</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="next-btn-wrap">
            <a class="btn btn--m" href="/#/cart">Previous</a>
            <a class="btn btn--m btn--red" href="/#/order-confirm">Next</a>
          </div>
        </div>
      </div>
    </div>
    <div class="addAddress" v-if="show">
      <div class="form">
        <div class="cancel" @click="show=false">×</div>
        <form>
          <p>收件人姓名:<input type="text" placeholder="请输入收件人姓名" v-model="name"></p>
          <p>收件人电话:<input type="number" placeholder="请输入收件人电话" v-model="phone"></p>
          <p>收货人地址:<textarea type="text" placeholder="请输入收件人地址" v-model="address"></textarea></p>
          <p><input type="button" value="确定" @click="refreshAdd"></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        name: '',
        phone: '',
        address: '',
        myAddArr: [],
        active: 0
      }
    },
    created() {
      this.myAddArr = JSON.parse(sessionStorage.address)
    },
    mounted() {
      this.$emit('pageNow', 'Address')
    },
    methods: {
      refreshAdd() {
//        console.log(this.addArr)
        if (!this.trimStr(this.name) || !this.trimStr(this.phone) || !this.trimStr(this.address)) {
          alert('不允许为空!')
          return
        }
        let obj = {
          name: this.name,
          phone: this.phone,
          address: this.address
        }
        this.myAddArr.push(obj)
//        console.log(this.myAddArr)
        sessionStorage.address = JSON.stringify(this.myAddArr)
//        console.log(JSON.parse(sessionStorage.address))
        this.show = false
        this.name = ''
        this.phone = ''
        this.address = ''
      },
      trimStr(str) { // 去除首尾空格
        if (str) {
          return str.replace(/(^\s*)|(\s*$)/g, '')
        } else {
          return str
        }
      }
    }
  }
</script>
<style scoped>
  .icon-add {
    font-size: 50px;
  }

  .addAddress {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
  }

  .form {
    position: relative;
    margin: 50px auto;
    width: 400px;
    height: 300px;
    background: rgba(0, 0, 0, .6);
    color: white;
    overflow: hidden;
  }

  .cancel {
    position: absolute;
    font-size: 40px;
    width: 40px;
    right: 0px;
    top: 0px;
    cursor: pointer;
  }

  .form p {
    position: relative;
    margin: 20px auto;
    padding: 10px;
    width: 100%;
    height: 30px;
    font-size: 16px;
  }

  .form p:first-child {
    margin-top: 50px;
  }

  .form p > input {
    position: absolute;
    width: 280px;
    height: 100%;
    font-size: 16px;
    right: 10px;
    top: 0px;
    border-radius: 2px;
  }

  .form p > textarea {
    position: absolute;
    width: 280px;
    height: 300%;
    font-size: 16px;
    right: 10px;
    top: 0px;
    border-radius: 2px;
  }

  .form p:last-child {
    bottom: -50px;
    text-align: center;
  }

  .form p:last-child > input {
    width: 50px;
  }

  .next-btn-wrap > a:first-child {
    float: left;
  }
</style>
