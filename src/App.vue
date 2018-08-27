<template>
  <div id="app">
    <div class="headerWrapper">
      <NavHeader :selectList="selectList" ref="head" @GetOldSelect="GetOldSelect"></NavHeader>
      <NavBread>
        <span slot="a">{{pageNow}}</span>
      </NavBread>
    </div>
    <div class="routerWrapper">
      <router-view :goods="goods" @selectList="refreshSelect" :selectList="selectList" @pageNow="pageNow=$event"
                   @finalSelect="finalSelect=$event" :finalSelect="finalSelect" @refreshCart="refreshCart"
                   @dropShop="dropShop"/>
    </div>
    <div class="footWrapper">
      <NavFooter></NavFooter>
    </div>
  </div>
</template>

<script>
  import NavHeader from './components/NavHeader.vue'
  import NavFooter from './components/NavFooter'
  import NavBread from './components/NavBread'

  export default {
    name: 'App',
    data() {
      return {
        pageNow: '',
        goods: [],
        selectList: [],
        finalSelect: []
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    created() {
      this.goodsData()
      let o = this
      if (sessionStorage.name) {
        this.axios.get('/api/cart/', {
          params: {
            name: sessionStorage.name,
            newSelect: sessionStorage.selected,
            address: sessionStorage.address
          }
        }).then(function (res) {
          sessionStorage.address = res.data.address
          sessionStorage.selected = res.data.selectShop
          if (sessionStorage.selected !== 'undefined') { // 注意从数据库返回的undefined是string
            o.selectList = JSON.parse(sessionStorage.selected)
          } else {
            o.selectList = []
          }
        }).catch(e => {
          // 打印一下错误
          console.log(e)
        })
      }
//      this.get()
    },
    computed: {},
    methods: {
      goodsData() { // 网络请求获取元数据
        this.axios.get('/api/goods').then(response => {
          let res = response.data
          if (res && res.errCode === 0) {
            this.goods = res.data
          }
        }).catch(err => {
          console.log('error:' + err)
        })
      },
      refreshSelect(item) {
        if (item.count === 0) {
          for (var i = 0; i < this.selectList.length; i++) {
            if (item.productId === this.selectList[i].productId) {
              this.selectList.splice(i, 1)
            }
          }
          sessionStorage.selected = JSON.stringify(this.selectList)
        }
        else if (item.count >= 1) { // 当前的选中数量
          var num = 0
          for (var j = 0; j < this.selectList.length; j++) {
            if (item.productId === this.selectList[j].productId) { // 判断该商品是否被在选中数组中
              sessionStorage.selected = JSON.stringify(this.selectList) // 更新缓存中的选中数组
              // 由于item和selectList中的对象是同一个,所以不需要手动修改count值,item.count就是this.selectList[j].count
              ++num
              return
            }
          }
          if (!num) {
            this.selectList.push(item)
            sessionStorage.selected = JSON.stringify(this.selectList)
//            console.log(sessionStorage.selected)
          }
        }
      },
      GetOldSelect(oldSelect) {
        if (oldSelect) {
          this.selectList = JSON.parse(oldSelect)
        }
      },
      refreshCart(newCartArr) {
        this.selectList = newCartArr
      },
      dropShop(obj) {
        this.$refs.head.drop(obj.good, obj.el)
      }
//      get() {
//        this.axios.get('/appi', {
//          parmas: {
//            start: 0,
//            count: 3
//          }
//        }).then(response => {
//          let res = response.data
//          console.log(res)
//        }).catch(err => {
//          console.log('error:' + err)
//        })
//      }
    },
    watch: {
      selectList(newValue, o) {
//        console.log(newValue)
//        console.log(o)
      }
    }
  }
</script>

<style>
  .headerWrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 100;
  }
  .routerWrapper{
    position: relative;
    z-index: 10;
  }

  /*.routerWrapper{*/
  /*position: fixed;*/
  /*left: 0;*/
  /*top:145px;*/
  /*width: 100%;*/
  /*}*/
  /*.footWrapper{*/
  /*position: fixed;*/
  /*!*margin-top: 150px;*!*/
  /*left: 0;*/
  /*bottom: 0px;*/
  /*width: 100%;*/
  /*}*/
</style>
