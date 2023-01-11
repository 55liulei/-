const HttpException = require("../exception/http.exception");
const Article = require('../model/article')
const User = require('../model/user')
const Tag = require("../model/tag")
const getSlug = require('../utils/slug');
const sequelize = require("../db/sequelize");
const { getFavorite, handleArticle, handleArticle2 } = require('./article')



const addFavorite = async (req, res, next) => {
    try {
        //01 获取文章slug
        // console.log('111111');
        const slug = req.params.slug
        //02 获取文章：包含标签
        let article = await Article.findByPk(slug, { include: Tag })
        // console.log(article);
        //03 获取喜欢文章用户（登录用户）
        const userEmail = req.user.email
        const user = await User.findByPk(userEmail)
        //04 文章添加喜欢用户 :四种方式
        await article.addUsers(userEmail)
        //    await  article.addUsers(user)
        //   await article.addUser(email)
        //   await article.addUser(user)
        //05 获取作者信息
        const author = await article.getUser() //文章作者
        //06 获取喜欢信息
        const { favoriteCount, favorited } = await getFavorite(article, req.user)
        //07 响应数据处理
        article = handleArticle(article, author, favoriteCount, favorited)
        //08 响应数据
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "喜欢文章成功",
                data: article
            })
    } catch (error) {
        next(error)
    }
}
const removeFavorite = async (req, res, next) => {
    try {
        //01 获取文章slug
        // console.log('111111');
        const slug = req.params.slug
        //02 获取文章：包含标签
        let article = await Article.findByPk(slug, { include: Tag })
        // console.log(article);
        //03 获取喜欢文章用户（登录用户）
        const userEmail = req.user.email
        const user = await User.findByPk(userEmail)
         //04  文章取消喜欢:四种方式
         await article.removeUsers(userEmail)
         //    await  article.removeUsers(user)
         //   await article.removeUser(email)
         //   await article.removeUser(user)
        //05 获取作者信息
        const author = await article.getUser() //文章作者
        //06 获取喜欢信息
        const { favoriteCount, favorited } = await getFavorite(article, req.user)
        //07 响应数据处理
        article = handleArticle(article, author, favoriteCount, favorited)
        //08 响应数据
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "取消喜欢文章成功",
                data: article
            })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    addFavorite,
    removeFavorite
}