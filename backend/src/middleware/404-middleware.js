const HttpException = require('../exception/http.exception')
const noMatchMiddleware=(req,res,next)=>{
    // res
    // .status(404)
    // .json({
    //     message:'url not found'
    // })
    //让下一个中间件处理：统一错误处理中间件
    const noMatchError = new HttpException(404,"访问路径不存在",'route url not found')
    next(noMatchError)
}   
module.exports=noMatchMiddleware