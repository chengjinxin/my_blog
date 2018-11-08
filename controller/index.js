
const showPage = (req,res) => {
    //使用render函数之前,要保证安装配置了ajs引擎模板
    res.render('index.ejs',{name:'zs'})
}

//暴露
module.exports = showPage