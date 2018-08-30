<template>
  <div class="accessory-result-page accessory-page">
    <div class="container">
      <div class="accessory-result">
        <!-- filter -->
        <div class="filter stopPop" id="filter">
          <dl class="filter-price">
            <dt>Price:</dt>
            <dd v-for="(item, index) in rangeClass" :key="index" :class="{'active':index===range}">
              <a href="javascript:void(0)"
                 @click="changeRange(index)">{{item}}</a>
            </dd>
          </dl>
        </div>

        <!-- search result accessories list -->
        <div class="accessory-list-wrap">
          <div class="accessory-list col-4">
            <ul>
              <li v-for="item in myGoods" :key="item.productId" v-show="isShow(item.prodcutPrice)">
                <div class="pic">
                  <a href="#"><img :src="'static/'+item.prodcutImg"></a>
                </div>
                <div class="main">
                  <div class="name">{{item.productName}}</div>
                  <div class="price">{{item.prodcutPrice}}</div>
                  <div class="btn-area">
                    <a href="javascript:void(0);" class="btn btn--m" @click.stop.prevent="doAdd(item,$event)">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <ul class="tab" v-show="range===0">
            <li v-for="item in page" :key="item" @click="showNow(item)" :class="{'active':pageIndex===item}">{{item}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../assets/css/product.css'

  export default {
    props: ['goods', 'selectList'],
    data() {
      return {
        range: 0,
        rangeClass: ['All', '0 - 100', '100 - 500', '500 - 1000', '1000 - 2000', 'more than 2000'],
//        myGoods: [],
        pageIndex: 1
      }
    },
    mounted() {
      this.$emit('pageNow', 'Goods')
    },
    methods: {
      changeRange(range) {
        this.range = range
      },
      isShow(price) {
        if (this.range === 0) {
          return true
        }
        else if (this.range === 1) {
          if (price > 0 && price < 100) return true
        }
        else if (this.range === 2) {
          if (price >= 100 && price < 500) return true
        }
        else if (this.range === 3) {
          if (price >= 500 && price < 1000) return true
        }
        else if (this.range === 4) {
          if (price >= 1000 && price < 2000) return true
        }
        else if (this.range === 5) {
          if (price >= 2000) return true
        }
        else {
          return false
        }
      },
      doAdd(item, event) {
        let o = this

        function a() {
          let num = 0
          for (var i = 0; i < o.selectList.length; i++) {
            if (item.productId === o.selectList[i].productId) { // 更新被选中过的商品的数量
              o.selectList[i].count++
              o.$emit('selectList', o.selectList[i])
              return ++num
            }
          }
        }

        if (!a()) { // 调用函数,并判断返回值,若该商品已在选中列表中则返回1,否则即该商品未在选中列表中,则将该商品的选中数量赋值为1
          this.$set(item, 'count', 1)
          this.$emit('selectList', item)
        }
        let el = event.target // 获取点击事件的事件源
        this.$emit('dropShop', {good: item, el})
      },
      showNow(index) {
        this.pageIndex = index
      }
    },
    computed: {
      page() {
        let page = 0
        this.goods.forEach((i) => {
          if (this.isShow(i.prodcutPrice)) {
            page++
          }
        })
        page = Math.ceil(page / 5)
        return page
      },
      myGoods() {
        if (this.goods.length) {
          let arr = []
          if (this.range === 0) {
            arr = this.goods.slice(5 * (this.pageIndex - 1), 5 * this.pageIndex)
            return arr
          } else {
            arr = this.goods
            return arr
          }
        }
      }
    }
  }
</script>

<style scoped>
  .active {
    background: orange;
    border-radius: 5px;
  }

  .filter-price {
    position: fixed;
    top: 145px;
  }

  .accessory-result-page {
    width: 100%;
  }

  .accessory-list-wrap{
    margin-top: 100px;
  }
  .tab {
    list-style: none;
    font-size: 0;
    margin: 50px auto;
    text-align: center;
  }

  .tab > li {
    display: inline-block;
    margin: 0 10px;
    width: 40px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid orangered;
    font-size: 20px;
    border-radius: 20px;
    cursor: pointer;
  }
</style>
