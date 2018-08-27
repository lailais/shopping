//配置express服务器
let express = require("express");
let apiServer = express();
let bodyParser = require("body-parser");
apiServer.use(bodyParser.urlencoded({extended: true}));
apiServer.use(bodyParser.json());
let apiRouter = express.Router(); //配置路由
apiServer.use("/api", apiRouter);
let MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://localhost:27017/info';

exports.doLogin = (res, userInfo) => {
  // console.log(userInfo)
  let selectData = function (db, callback) {
    //连接数据库
    let dbS = db.db("info");
    //连接到表
    let collection = dbS.collection('user');
    collection.find({userName: userInfo.userName}).toArray(function (err, result) {
      if (err) {
        console.log('Error:' + err);
        return;
      }
      callback(result);
    });
  };
  MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
    // console.log("连接成功！");
    selectData(db, function (result) {
      if (err) {
        console.log(err)
        res.json({type: -2, msg: '登录失败'})  //res.json向前端传输 type 和 数据（多个以逗号隔开）
      }
      if (result.length <= 0) {
        res.json({type: -1, msg: '该账号未注册'})
      } else {
        if (result[0].password !== userInfo.userPsw) {
          res.json({type: 0, msg: '账号或密码错误'})
        } else {
          res.json({type: 1, msg: '验证成功', user: result[0]})
        }
      }
    });
  })
}

exports.doRegister = (res, userInfo) => {
  // console.log(userInfo)
  MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, (err, client) => {
    if (err) {
      console.log(err)
      client.close()
      return
    }
    let info = client.db('info')
    let user = info.collection('user') //user集合（有关用户信息）

    user.find({userName: userInfo.userName}).toArray((err, result) => {  //查找数据库  找字段name且类型为req.body.user 的数据
      if (err) {
        console.log(err)
        res.json({type: -2, msg: '注册失败'})  //res.json向前端传输 type 和 数据（多个以逗号隔开）
      }
      if (result.length > 0) {  //若查询结果长度大于0，即该用户名已存在
        res.json({type: -1, msg: '该用户名已被注册'})
      } else {
        res.json({type: 1, msg: '注册成功'})
        //往数据库中插入新增用户的信息
        user.insert({
          userName: userInfo.userName,
          password: userInfo.userPsw,
          selectShop: 'undefined',
          address: 'undefined'
        }, (err) => {
          if (err) {
            return console.log(err)
          }
        })
      }
    })
  })
}
exports.refreshDB = (res, userInfo) => {
  // console.log(userInfo)
  MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, (err, client) => {
    if (err) {
      console.log(err)
      client.close()
      return
    }
    let info = client.db('info')
    let user = info.collection('user') //user集合（有关用户信息）
    user.find({userName: userInfo.name}).toArray((err, result) => {
      if (err) {
        console.log(err)
        res.json({type: -2, msg: '获取购物车商品失败'})
      }

      function a() {
        if (userInfo.newSelect) {
          return userInfo.newSelect
        } else {
          return result[0].selectShop
        }
      }

      function b() {
        if (userInfo.address) {
          return userInfo.address
        } else {
          return result[0].address
        }
      }

      user.update({userName: userInfo.name}, {$set: {selectShop: a()}})
      user.update({userName: userInfo.name}, {$set: {address: b()}})
      res.json({type: 1, selectShop: a(), address: b()})
    })
  })
}
