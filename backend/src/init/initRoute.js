const userRouter = require('../routes/users')
const followRouter = require('../routes/follow')
const tagRouter = require('../routes/tags')
const articleRouter = require('../routes/article')
const favoriteRouter = require("../routes/favorites")
const commentRouter = require("../routes/comments")
const initRoute = (app) => {
    //测试
    // app.get('/api/v1/users', (req, res) => {
    //     res
    //         .status(200)
    //         .json({
    //             status: 1,
    //             message: "success",
    //             data: 'hello'
    //         })
    // })
    //对用户进行增删改查，需要用get ,post 等等，所以不能只写get ，要写use,一旦访问这个地址，要使用对应的模块化
    //路由模块化
    app.use('/api/v1/users', userRouter) //用户
    app.use('/api/v1/follow', followRouter) //关注
    app.use('/api/v1/tags', tagRouter) //标签
    app.use('/api/v1/articles', articleRouter) //文章
    app.use('/api/v1/favorites', favoriteRouter) //喜欢
    app.use('/api/v1/comments',commentRouter) //评论


}

module.exports=initRoute