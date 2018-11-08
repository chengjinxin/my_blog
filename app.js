const express = require('express')
const app = express()
const bodyParser = require('body-parser')




//设置模板引擎名称
app.set('view engine','ejs')
//模板引擎渲染路径
app.set('views','./views')


//注册解析表单数据中间件
app.use(bodyParser.urlencoded({extended: false}))


//托管静态资源目录
app.use('/node_modules',express.static('./node_modules'))


//导入index.js路由模板
const router1 = require('./router/index.js')
app.use(router1)

//导入用户模块
const router2 = require('./router/user.js')
app.use(router2)







app.listen(80,() => {
    console.log('server running at http://127.0.0.1')
})