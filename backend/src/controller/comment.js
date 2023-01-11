const HttpException = require("../exception/http.exception");
const Article = require('../model/article')
const User = require('../model/user')
const Tag = require("../model/tag")
const Comment = require("../model/comment")
const getSlug = require('../utils/slug');
const sequelize = require("../db/sequelize");



//创建评论
const createComment = async (req, res, next) => {
    try {
        const { slug } = req.params
        const { body } = req.body.comment //评论内容
        // 评论文章
        const article = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(404, '评论文章不存在')
        }
        //获取评论人
        const email = req.user.email
        const user = await User.findByPk(email)
        if (!user) {
            throw new HttpException(404, '评论用户不存在')
        }
        //创建评论
        //1) 存储评论数据
        let newComment = await Comment.create({
            body: body
        })
        //2）存储评论关系
        //用户和评论
        await user.addComments(newComment)
        //文章和评论
        await article.addComments(newComment)
        newComment.dataValues.user = {
            username: user.username,
            avatar: user.avatar,
            bio: user.bio
        }
        //响应数据
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "创建评论成功",
                data: newComment
            })
    } catch (error) {
        next(error)
    }
}
//获取所有评论
const getComments = async (req, res, next) => {
    try {
        const { slug } = req.params
        // 评论文章
        const article = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(404, '评论文章不存在')
        }
        const comments = await Comment.findAll({
            where: {
                articleSlug: slug
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'avatar', 'bio']
                }
            ]
        })
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "获取所有评论成功",
                data: comments
            })
    } catch (error) {
        next(error)
    }
}
//删除评论
const deleteComment = async (req, res, next) => {
    try {
        const { slug, id } = req.params
        // 评论文章
        const article = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(404, '评论文章不存在')
        }
        //查看评论是否存在
        const comment = await Comment.findByPk(id)
        if (!comment) {
            throw new HttpException(404, '删除评论不存在')
        }
        //删除权限
        const userEmail = req.user.email
        const commentEmail = comment.userEmail
        if(userEmail!==commentEmail){
            throw new HttpException(403,'当前用户没有删除权限')
        }
        //文章的作者是否有删除权限

        await comment.destroy()
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "删除评论成功",
            })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createComment,
    getComments,
    deleteComment

}