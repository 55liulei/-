const HttpException = require("../exception/http.exception")
const { decode } = require('../utils/jwt')
const authMiddleware = async (req, res, next) => {
    //01获取 token
    //1-1 获取header header => Authorization  = Token token
    const authHeader = req.headers.authorization
    //    console.log(authHeader);
    if (!authHeader) {
        return next(new HttpException(401, 'Authorization 必须提供', 'Authorization missing'))
    }
    //1-2 验证 Authorization值的格式： 匹配：Token token
    const authHeaderArr = authHeader.split(' ')
    // console.log(authHeaderArr);
    if (authHeaderArr[0] !== 'Token') {
        return next(new HttpException(401, 'Authorization 格式错误，正确格式： Token token', 'token format error'))
    }
    //1-3 获取真正的token
    const token = authHeaderArr[1]
    if (!token) {
        return next(new HttpException(401, 'Authorization 格式错误，正确格式： Token token', 'token value error'))
    }
    // console.log(token);
    //02验证token
    try {
        const userinfo = await decode(token)
    //   console.log(userinfo);
    if (!userinfo) {
        return next(new HttpException(401, 'token 内容不存在', 'token content missing'))
    }
    console.log('-----------门卫--放过-------------');
    //解签成功
    req.user = userinfo
    req.token = token
    return next()
    } catch (error) {
        //解签失败
        return next(new HttpException(401, 'token 验证失败，请重新登录', error.message))
    }
    
}
module.exports = authMiddleware