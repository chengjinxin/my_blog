const mysql = require('mysql')
const moment = require('moment')

const conn = mysql.createConnection({
    host:'127.0.0.1',
    database:'my_blog',
    user:'root',
    password:'root'
})


//用户请求的注册页面
const showRegister = (req,res) => {
    res.render('./user/register.ejs',{})
}

//用户请求的是登录页面
const showLogin = (req,res) => {
    res.render('./user/login.ejs',{})
}

//要注册新用户了
const reg = (req,res) => {
    //完成用户注册的业务逻辑
    const body = req.body
    //判断用户输入数据是否完整
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({msg:'请填写完整的表单再注册',status:501})
    }
    //查询用户名是否重复
    const sql1 = 'select count(*) as count from blog_username where username=?'
    conn.query(sql1,body.username,(err,result) => {
        //如果查询失败,则告知客户端失败
        if(err) return res.send({msg:'用户名查重失败',status:502})
        // console.log(result)
        if(result[0].count !==0) return res.send({msg:'请更换其他用户名重试',status:503})

        //执行注册业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = 'insert into blog_username set ?'
        // console.log(body.ctime)
        conn.query(sql2,body,(err,result) => {
            if(err) return res.send({msg:'用户注册失败',status:504})
            // console.log(result)
            if(result.affectedRows !== 1) return res.send({msg:'注册用户失败',status:504})
            res.send({msg:'注册新用户成功',status:200})
        })
    })
}

//监听登录用户
const logo = (req,res) => {
    //获取到表单数据
    const body = req.body
    //执行sql语句,查询用户是否存在
    const sql3 = 'select * from blog_username where username=? and password=?'
    conn.query(sql3,[body.username,body.password],(err,result) => {
        if(err) return res.send({msg:'用户登录失败',status:501})
        //条数不为1,则失败
        if(result.length !==1) return res.send({msg:'用户登录失败',status:502})
        //将登陆的成功信息挂载到session
        // console.log(result)
        req.session.user = result[0]
        //将用户登录成功之后的结果挂在到session上
        req.session.islogin = true
        res.send({msg:'用户登录成功',status:200})
    })
}

//注销
const logout = (req,res) => {
    req.session.destroy(function() {
        //使用res.redirect方法可以让客户端重新访问指定的页面
        res.redirect('/')
    })
}

module.exports = {
    showRegister,
    showLogin,
    reg,
    logo,
    logout
}