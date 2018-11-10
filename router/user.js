const express = require('express')
const router = express.Router()


//导入业务抽离模板
const str = require('../controller/user.js')


//用户请求的注册页面
router.get('/register',str.showRegister)

//用户请求的是登录页面
router.get('/login',str.showLogin)


//要注册新用户了
router.post('/register',str.reg)

//监听登录用户
router.post('/login',str.logo)


//监听注销请求
router.get('/logout',str.logout)

//暴露在外面
module.exports = router