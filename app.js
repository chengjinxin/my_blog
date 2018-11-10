const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

// 导入session中间件
const session = require('express-session')

//注册session中间件
app.use(
    session({
        secret:'这是加密的秘钥',
        resave:false,
        saveUninitialized:false
    })
)


//设置模板引擎名称
app.set('view engine','ejs')
//模板引擎渲染路径
app.set('views','./views')


//注册解析表单数据中间件
app.use(bodyParser.urlencoded({extended: false}))


//托管静态资源目录
app.use('/node_modules',express.static('./node_modules'))


//导入index.js路由模板
// const router1 = require('./router/index.js')
// app.use(router1)

// //导入用户模块
// const router2 = require('./router/user.js')
// app.use(router2)


//使用循环的方式进行路由的自动注册
fs.readdir(path.join(__dirname,'./router'),(err,filenames) => {
    if(err) return console.log('读取router文件的路由失败')
    //循环
    filenames.forEach(fname => {
        //没循环一次,拼接一个完整的路由模块
        //然后使用require导入这个路由模块
        const router = require(path.join(__dirname,'./router',fname))
        app.use(router)
    })
})






app.listen(80,() => {
    console.log('server running at http://127.0.0.1')
})