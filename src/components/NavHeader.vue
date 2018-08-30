<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/#/">
          <img class="navbar-brand-logo" src="/static/logo.png"></a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--&lt;!&ndash;<a href="/" class="navbar-link">我的账户</a>&ndash;&gt;-->
          <!--<span class="navbar-link"></span>-->
          <a href="javascript:void(0)" class="navbar-link" @click="show=true;login=true" v-if="!logged">Login</a>
          <a href="javascript:void(0)" v-if="logged" class="navbar-link">欢迎{{sessionName}}</a>
          <a href="javascript:void(0)" class="navbar-link" v-if="logged" @click="logout">Logout</a>
          <div class="navbar-cart-container">
            <router-link class="navbar-link navbar-cart-link" to="/cart">
              <div class="icon-cart" ref="iconcart"></div>
              <span class="navbar-cart-count">{{total}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="loginWrapper" v-show="show">
      <div class="wrapper">
        <div class="cancel" @click="show=false">x</div>
        <div class="wrong" v-if="isWrong">{{wrongMsg}}</div>
        <div id="login" v-show="login">
          <h1 ref="fromRegister">欢迎登陆</h1>
          <p @click="isWrong=false"><input type="text" placeholder="请输入账号" v-model="userName"></p>
          <p @click="isWrong=false"><input type="password" placeholder="请输入密码" v-model="psw"></p>
          <p><input type="button" value="登陆" ref="loginBtn" @click="isLogin"></p>
          <span @click="login=!login;isWrong=false">没有账号？请先注册！</span>
        </div>
        <div id="register" v-show="!login">
          <h1>请注册</h1>
          <p @click="isWrong=false"><input type="text" placeholder="请输入账号" v-model="userName"></p>
          <p @click="isWrong=false"><input type="password" placeholder="请输入密码" v-model="psw"></p>
          <p><input type="button" value="注册" @click="isRegister" ref="register"></p>
          <span @click="login=!login;isWrong=false">已有账号？请登陆！</span>
        </div>
      </div>
    </div>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ballWrapper" v-show="ball.show">
        <div class="ball" ref="ball"></div>
      </div>
    </transition>
  </header>
</template>
<script>

  export default {
    props: ['selectList'],
    data() {
      return {
        show: false,
        userName: null,
        psw: null,
        login: true,
        isWrong: true,
        wrongMsg: '',
        ball: {show: false}
      }
    },
    computed: {
      total() {
        let total = 0
        this.selectList.forEach((i) => {
          total = total + i.count
        })
        return total
      },
      sessionName() {
        return sessionStorage.name
      },
      logged() {
        if (sessionStorage.name) {
          return true
        }
        else {
          return false
        }
      }
    },
    methods: {
      isRegister() {
        if (!this.trimStr(this.userName) || !this.trimStr(this.psw)) {
          this.isWrong = true
          this.wrongMsg = '!账号密码不能为空'
          return
        }
        this.$refs.register.value = '注册中...'
        let o = this
        this.axios.get('/api/register/', {
          params: {
            userName: this.userName,
            userPsw: this.psw
          }
        }).then(function (res) {
          if (res.data.type === 1) {
            o.login = true
            o.userName = ''
            o.psw = ''
            o.$refs.fromRegister.innerHTML = '注册成功 请登录'
          } else {
            o.isWrong = true
            o.wrongMsg = res.data.msg
            o.$refs.register.value = '注册'
          }
        }).catch(e => {
          // 打印一下错误
          console.log(e)
        })
      },
      isLogin() {
        if (!this.trimStr(this.userName) || !this.trimStr(this.psw)) {
          this.isWrong = true
          this.wrongMsg = '!账号密码不能为空'
          return
        }
        this.$refs.loginBtn.value = '登陆中...'
        let o = this
        this.axios.get('/api/login/', {
          params: {
            userName: this.userName,
            userPsw: this.psw
          }
        }).then(function (res) {
          if (res.data.type === 1) {
            o.$refs.loginBtn.value = '登陆成功...'
            sessionStorage.name = res.data.user.userName
            if (sessionStorage.selected && res.data.user.selectShop !== 'undefined') {
//              console.log('aaa')
              let a = JSON.parse(res.data.user.selectShop)
              let b = JSON.parse(sessionStorage.selected)
              let c = a.concat(b)
              for (var i = 0; i < c.length; i++) {
                for (var j = i; j < c.length; j++) {
                  if (c[i].productId === c[j].productId) {
                    c[i].count = c[i].count + c[j].count
                    c.splice(j, 1)
                  }
                }
              }
//              console.log(c)
              sessionStorage.selected = JSON.stringify(c)
            }
            location.reload()
            o.show = false
          } else {
            o.isWrong = true
            o.wrongMsg = res.data.msg
            o.$refs.loginBtn.value = '登录'
          }
//          console.log(res.data)
        }).catch(e => {
          // 打印一下错误
          console.log(e)
        })
      },
      trimStr(str) { // 去除首尾空格
        if (str) {
          return str.replace(/(^\s*)|(\s*$)/g, '')
        } else {
          return str
        }
      },
      logout() {
        this.axios.get('/api/cart/', {
          params: {
            name: sessionStorage.name,
            newSelect: sessionStorage.selected,
            address: sessionStorage.address
          }
        }).then(function (res) {
//          sessionStorage.address = res.data.address
//          sessionStorage.selected = res.data.selectShop
//          if (sessionStorage.selected !== 'undefined') { // 注意从数据库返回的undefined是string
//            o.selectList = JSON.parse(sessionStorage.selected)
//          } else {
//            o.selectList = []
//          }
        }).catch(e => {
          // 打印一下错误
          console.log(e)
        })
        location.reload()
        sessionStorage.selected = ''
        sessionStorage.address = ''
        sessionStorage.name = ''
      },
      drop(good, el) {
        this.ball.show = true
        this.$refs.ball.style.background = 'url(' + 'static/' + good.prodcutImg + ')'
        this.$refs.ball.style.backgroundSize = '100%'
        this.$set(this.ball, 'el', el) // 设置ball的el属性,记录点击该小球的元素
      },
      beforeEnter(el) { // 小球将要进入
        this.$refs.ball.style.width = '200px'
        this.$refs.ball.style.height = '200px'
        let rect = this.ball.el.getBoundingClientRect()
        let x = -(window.innerWidth - rect.left - 170)
        let y = rect.top - 250
        el.style.transform = `translateY(${y}px)`
        let inner = el.getElementsByClassName('ball')[0]
        inner.style.transform = `translateX(${x}px)`
      },
      enter(el, done) { // 小球进入中
        let rf = el.offsetHeight // 强制刷新
        if (rf) {
        }
        this.$nextTick(() => {
          el.style.transform = `translateY(0)`
          let inner = el.getElementsByClassName('ball')[0]
          inner.style.transform = `translateX(0)`
          el.addEventListener('transitionend', done)
          this.$refs.ball.style.width = '40px'
          this.$refs.ball.style.height = '40px'
        })
      },
      afterEnter(el) { // 小球进入完毕
        this.ball.show = false
        el.style.display = 'none'
      }
    }
  }
</script>
<style scoped>
  @import '../assets/css/login.css';

  .loginWrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 100;
  }

  #login, #register {
    width: 300px;
    height: 320px;
    background: rgba(255, 255, 255, .9);
    margin: 50px auto;
    text-align: center;
    overflow: hidden;
    position: relative;
  }

  #login h1, #register h1 {
    margin: 20px auto;
  }

  #login p, #register p {
    width: 200px;
    border: 1px solid rgba(0, 0, 0, .1);
    box-sizing: border-box;
    margin: 20px auto;
  }

  #login input, #register input {
    border: none;
    width: 100%;
    height: 40px;
  }

  #login input[type='button'], #register input[type='button'] {
    /*margin-top: 30px;*/
    background: orangered;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }

  #login > span, #register > span {
    display: block;
    float: right;
    margin-right: 20px;
    font-size: 12px;
    color: grey;
    cursor: pointer;
  }

  .wrapper {
    position: relative;
    margin: 0 auto;
    width: 300px;
  }

  .wrong {
    position: absolute;
    font-size: 12px;
    color: red;
    bottom: 113px;
    left: 105px;
    z-index: 10;
  }

  .cancel {
    position: absolute;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 30px;
    top: 0px;
    right: 0px;
    cursor: pointer;
    z-index: 10;
    text-align: center;
  }

  .header {
    position: relative;
    z-index: 100;
  }

  .ballWrapper {
    position: absolute;
    width: 100%;
    height: 50px;
    left: 0;
    top: 0px;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }

  .ball {
    position: absolute;
    width: 40px;
    height: 40px;
    background: lightblue;
    right: 10px;
    bottom: 0px;
    transition: all 0.5s linear;
  }

  .icon-cart {
    font-size: 25px;
    /*font-size: 40px;*/
  }
</style>
