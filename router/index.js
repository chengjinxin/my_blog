const express = require('express')
const router = express.Router()


//导入业务处理模块
const strl = require('../controller/index.js')

//用户请求的项目首页
router.get('/',strl)


//暴露在外面
module.exports = router