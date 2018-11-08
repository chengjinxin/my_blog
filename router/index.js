const express = require('express')
const router = express.Router()

//用户请求的项目首页
router.get('/',(req,res) => {
    //使用render函数之前,要保证安装配置了ajs引擎模板
    res.render('index.ejs',{name:'zs'})
})


//暴露在外面
module.exports = router