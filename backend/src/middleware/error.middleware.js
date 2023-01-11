//统一错误处理中间件：最终错误都会被拦截并处理
//error : HttpException的实例
const errorMiddleware = (error,req,res,next)=>{
    const status = error.status || 500
    const message = error.message ||"服务器端错误"
    const errors = error.errors ||"server wrong"
    
    res.status(status)
    .json({
        status:0,
        message,
        errors
    })
}
module.exports=errorMiddleware