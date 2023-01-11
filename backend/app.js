//配置项目环境
require('dotenv').config('.env')
//三方中间件
const cors =require('cors')
const morgan = require('morgan')
//自定义中间件
const  noMatchMiddleware = require('./src/middleware/404-middleware')
const  errorMiddleware=require('./src/middleware/error.middleware')

const express = require('express')
const dbConnection = require('./src/db/connection')
const initDB=require("./src/init/initDB")
const initServer=require("./src/init/initServer")
const initRoute=require('./src/init/initRoute')
const app = express()



//应用中间件


//跨域
app.use(cors())

//数据解析
app.use(express.json())

//http请求日志
app.use(morgan('tiny'))  
//frontend -api -backend
// //数据库链接

// const dbconnection = async () => {
//     try {
//         await sequelize.authenticate()
//         console.log(`mysql connect success on ${process.env.DB_PORT}`);
//     } catch (error) {
//         console.log(`mysql connect fail:`, error);
//     }
// }
// // dbconnection()

//初始化路由
initRoute(app)

//静态服务
app.use(express.static('public'))

//404
app.use(noMatchMiddleware)
//错误处理
app.use(errorMiddleware)

const main =async()=>{
    await initDB()
    await initServer(app)
}
main()

//app-initDB-dbConnection - model 初始化




