const HttpException = require("../exception/http.exception");
const Article = require('../model/article')
const User = require('../model/user')
const Tag = require("../model/tag")
const getSlug = require('../utils/slug');
const sequelize = require("../db/sequelize");
const { decode } = require("jsonwebtoken");

const handleArticle = (article, author, favoriteCount, favorited) => {
    //处理标签
    const tags = []
    for (const tag of article.dataValues.tags) {
        tags.push(tag.name)
    }
    article.dataValues.tags = tags
    //处理作者
    delete author.dataValues.password
    delete article.dataValues.userEmail
    article.dataValues.author = author
    //处理喜欢信息
    article.dataValues.favoriteCount = favoriteCount || 0
    article.dataValues.favorited = favorited || false
    return article.dataValues
}

const handleArticle2 = (article, favoriteCount, favorited) => {
    //处理标签
    const tags = []
    for (const tag of article.dataValues.tags) {
        tags.push(tag.name)
    }
    article.dataValues.tags = tags
    //处理作者
    let author = article.dataValues.user
    delete author.dataValues.password
    delete article.dataValues.userEmail
    delete article.dataValues.user
    article.dataValues.author = author
    //处理喜欢信息
    article.dataValues.favoriteCount = favoriteCount || 0
    article.dataValues.favorited = favorited || false
    return article.dataValues
}
//创建文章
const createArticle = async (req, res, next) => {
    try {
        //01 获取数据
        const { title, description, body, tags } = req.body.article
        //02验证数据
        //todo
        if(!title){
            throw new HttpException(401, '文章标题不存在', 'title not found')
        }
        //03 获取作者email ：当前登录用户创建文章 =》登录用户即作者
        const { email } = req.user
        //04验证作者信息
        const author = await User.findByPk(email)
        // console.log(author);
        if (!author) {
            throw new HttpException(401, '作者账号不存在', 'author not found')
        }
        //05生成别名slug
        const slug = getSlug()
        // console.log(slug);
        // console.log(author);
        // console.log(description,body,title,tags);
        //06 创建文章
        let article = await Article.create({
            slug,
            title,
            description,
            body,
            userEmail: email
        })
        // console.log(article);
        // console.log(article.__proto__);
        //07 标签存储 : ['html','css'] 存储标签 和 文章标签关系
        if (tags.length > 0) {
            for (const tag of tags) {
                let exitTag = await Tag.findByPk(tag)
                if (!exitTag) {//标签不存在
                    //存储标签
                    let newTag = await Tag.create({ name: tag })
                    //存储文章和标签的关系
                    await article.addTag(newTag)
                } else { //标签存在
                    await article.addTag(exitTag)
                }
            }
        }
        //08 获取文章 ： 文章信息 + 作者信息 + 标签信息
        article = await Article.findByPk(slug, { include: Tag })
        // console.log(article);
        //09 响应数据处理 ： 格式处理
        //userEmail: '339912828@qq.com',
        // tags: [ [tag], [tag] ]
        article = handleArticle(article, author)
        //10 响应数据
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "创建文章成功",
                data: article
            })
    } catch (error) {
        next(error)
    }
}

const getFavorite = async (article, currentUser) => {

    //获取喜欢该文章人的数量
    const favoriteCount = await article.countUsers()
    //    console.log(favoriteCount);
    // 当前用户是否喜欢
    const favoriteUser = await article.getUsers() //喜欢文章的所有人
    // console.log(favoriteUser);
    let allFavoriteEmail = []
    for (const user of favoriteUser) {
        allFavoriteEmail.push(user.email)
    }
    let favorited = false
    if (currentUser) {
        let loginEmail = currentUser.email
        favorited = allFavoriteEmail.includes(loginEmail)
    }
    return { favoriteCount, favorited }
}

//获取单篇文章
const getArticle = async (req, res, next) => {
    try {
        //   console.log('1111111');
        const slug = req.params.slug
        //01 获取文章 + 标签
        let article = await Article.findByPk(slug, { include: Tag })
        //  console.log(article);
        // 法1
        //    let  userEmail = article.userEmail
        //    let author = await Author.findByPk(userEmail)
        // 法2
        let author = await article.getUser()
        //  console.log(author);
        //02 获取喜欢信息
        // console.log(req.user,'req.user');
        const { favoriteCount, favorited } = await getFavorite(article, req.user)
        // console.log(favoriteCount, favorited);

        //03 文章响应数据处理
        article = handleArticle(article, author, favoriteCount, favorited)
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "获取文章成功",
                data: article
            })
    } catch (error) {

    }
}

//更新文章
const updateArticle = async (req, res, next) => {
    try {
        //01 获取更新文章slug
        const { slug } = req.params
        //02 获取更新文章的数据
        const data = req.body.article
        const title = data.title
        const description = data.description
        const tags = data.tags
        const body = data.body
        //03 获取更新文章 ： 验证被更新的文章是否存在
        let article = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(401, '更新文章不存在', 'update article not found')
        }
        //04 更新业务逻辑验证 ：登录用户只能更新自己的文章
        let authorEmail = article.userEmail
        let loginEmail = req.user.email
        // console.log(authorEmail);
        // console.log(loginEmail);
        if (authorEmail !== loginEmail) {
            throw new HttpException(403, '只有作者才有修改文章权限', 'Only the author has permission to revise the article')
        }
        //05 更新文章
        const updateArticle = article.update({ title, body, description })
        // console.log(updateArticle);
        //06 更新标签
        //06-1 删除文章和标签的关系
        //    console.log(article.__proto__);
        const oldTags = []
        const getTags = await article.getTags()
        for (const tag of getTags) {
            oldTags.push(tag.name)
        }
        // console.log(oldTags);
        await article.removeTags(oldTags)
        //06-2 创建标签和  文章与标签的关系
        if (tags.length > 0) {
            for (const tag of tags) {
                let exitTag = await Tag.findByPk(tag)
                if (!exitTag) {//标签不存在
                    //存储标签
                    let newTag = await Tag.create({ name: tag })
                    //存储文章和标签的关系
                    await article.addTag(newTag)
                } else { //标签存在
                    await article.addTag(exitTag)
                }
            }
        }
        //07 获取更新后的文章（包含tag）
        article = await Article.findByPk(slug, { include: Tag })
        //08 获取作者信息
        let author = await User.findByPk(loginEmail)
        //let author = awaot article.getUser()
        //09 获取喜欢信息
        const { favoriteCount, favorited } = await getFavorite(article, req.user)
        //10 响应数据处理
        article = handleArticle(article, author, favoriteCount, favorited)
        //11 响应数据
        res.
            status(200)
            .json({
                status: 1,
                message: '更新文章成功',
                data: article
            })
    } catch (error) {
        next(error)
    }
}

//删除文章
const deleteArticle = async (req, res, next) => {
    try {
        //01 获取删除文章slug
        const { slug } = req.params
        //02 获取删除文章的数据
        const data = req.body.article
        // const title = data.title
        // const description = data.description
        // const tags = data.tags
        // const body = data.body
        //03 获取删除文章 ： 验证被更新的文章是否存在
        let article = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(401, '删除文章不存在', 'delete article not found')
        }
        //04 删除业务逻辑验证 ：登录用户只能删除自己的文章
        let authorEmail = article.userEmail
        let loginEmail = req.user.email
        // console.log(authorEmail);
        // console.log(loginEmail);
        if (authorEmail !== loginEmail) {
            throw new HttpException(403, '只有作者才有删除文章权限', 'Only the author has permission to delete the article')
        }
        //05 删除文章
        //适合批量删除
        // const deleteArticle = Article.destroy({
        //     where:{
        //         slug
        //     }
        // })
        // 适合单个删除
        const deleteArticle = await article.destroy()
        //06 响应数据
        res.
            status(200)
            .json({
                status: 1,
                message: '删除文章成功',
                data: deleteArticle
            })
    } catch (error) {
        next(error)
    }
}

//获取关注作者的文章
const getFollowArticles = async (req, res, next) => {
    try {
        //01 获取粉丝(登录用户)邮箱
        const fansEmail = req.user.email
        const fansUser = await User.findByPk(fansEmail)
        // console.log(fansUser.__proto__);
        const query = `SELECT userEmail FROM followers WHERE followerEmail = "${fansEmail}"`
        const authors = await sequelize.query(query)
        //   console.log(authors[0]);
        if (authors[0].length === 0) {
            res.
                status(200)
                .json({
                    status: 1,
                    message: '获取关注作者的文章成功',
                    data: []
                })
        }
        let authorEmails = []
        for (const item of authors[0]) {
            authorEmails.push(item.userEmail)
        }
        // console.log(authorEmails);

        //批量查询 ：
        const { count, rows } = await Article.findAndCountAll({
            distinct: true, //去重
            where: {
                userEmail: authorEmails //可以等于一个数组
            },
            include: [Tag, User]
        })
        // console.log(count,rows);
        //处理响应数据
        const articles = []
        for (const article of rows) {
            // console.log(article.tags);
            //处理每一篇文章喜欢信息
            const { favoriteCount, favorited } = await getFavorite(article, req.user)
            //处理每一篇文章的标签 作者 喜欢 重新组装

            let handleArticle = handleArticle2(article, favoriteCount, favorited)
            articles.push(handleArticle)
        }
        console.log(articles);
        res.
            status(200)
            .json({
                status: 1,
                message: '获取关注作者的文章成功',
                data: { count, articles }
            })
    } catch (error) {
        next(error)
    }
}

//全局文章：条件： author / tag / limit / offset /favorite
const getArticles = async (req, res, next) => {
    try {
        //01 获取登录用户email (可选 加授权中间件可以使用)
        //02 获取query参数 query=》favorite tag offset
        const { author, tag, favorite, limit = 10, offset = 0 } = req.query
        let result;
        //03 分场景查询
        //标签过滤文章
        if (tag && !author && !favorite) {
            result = await Article.findAndCountAll({ //批量查询
                distinct: true,
                include: [
                    { model: Tag, attributes: ['name'], where: { name: tag } },
                    { model: User, attributes: ['email', 'username', 'avatar', 'bio'] }
                ],
                limit: parseInt(limit),
                offset: parseInt(offset)
            })
        }
        //作者自己的文章
        if (!tag && author && !favorite) {
            result = await Article.findAndCountAll({ //批量查询
                distinct: true,
                include: [
                    { model: Tag, attributes: ['name'] },
                    {
                        model: User, attributes: ['email', 'username', 'avatar', 'bio'], where: {
                            username: author
                        }
                    }
                ],
                limit: parseInt(limit),
                offset: parseInt(offset)
            })
        }
        //作者文章和标签过滤 tag && author
        if (tag && author && !favorite) {
            result = await Article.findAndCountAll({ //批量查询
                distinct: true,
                include: [
                    { model: Tag, attributes: ['name'], where: { name: tag } },
                    {
                        model: User, attributes: ['email', 'username', 'avatar', 'bio'], where: {
                            username: author
                        }
                    }
                ],
                limit: parseInt(limit),
                offset: parseInt(offset)
            })
        }
        //作者喜欢的文章 favorite = 作者
        if (!tag && !author && favorite) {
            const authorName = favorite
            const author = await User.findOne({
                where: { username: authorName }
            })
            const authorEmail = author.email
            const query = `SELECT articleSlug from favorites where userEmail = "${authorEmail}"`
            const queryResult = await sequelize.query(query)
            // console.log(queryResult);
            if (queryResult[0].length === 0) {
                return res
                    .status(200)
                    .json({
                        status: 1,
                        message: '没有喜欢的文章',
                        data:{count:0,articles:[]}
                    })
            }
            //  [{articleSlug:xx1},{articleSlug:xx2}]
            let articleSlugs = []
            for (const item of queryResult[0]) {
                articleSlugs.push(item.articleSlug)
            }
            result = await Article.findAndCountAll({
                distinct: true,
                where: {
                    slug: articleSlugs
                },
                include: [Tag, User]
            })
        }
        //其他情况 ： 全局查询 没有具体条件 只做分页
        if (!tag && !author && !favorite) {
            result = await Article.findAndCountAll({ //批量查询
                distinct: true,
                include: [
                    { model: Tag, attributes: ['name'] },
                    { model: User, attributes: ['email', 'username', 'avatar', 'bio'] }
                ],
                limit: parseInt(limit),
                offset: parseInt(offset)
            })
        }
        // console.log(result);
        const { count, rows } = result
        // const authHeader = req.headers.authorization
        // const authHeaderArray = authHeader.split(' ')
        // const token = authHeaderArray[1] // 如果没有 undefined 没登录
        // let userinfo = null
        // if(token){
        //      userinfo = await decode(token)
        // }else{

        // }
        //   console.log(count,rows);
        //04 响应数据处理 for 循环 =》处理每一篇文章
        const articles=[]
         for (const article of rows) {
            //处理每一篇文章喜欢信息
            const { favoriteCount, favorited } = await getFavorite(article,req.user)
            //处理每一篇文章：标签 作者 喜欢 重新组装
            let handleArticle = handleArticle2(article, favoriteCount, favorited)
            articles.push(handleArticle)
        }
        //05 响应数据
        res
            .status(200)
            .json({
                status: 1,
                message: '获取关注作者的文章成功',
                data: {count,articles}
            })

    } catch (error) {
        next(error)
    }
}
module.exports = {
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle,
    getFollowArticles,
    getFavorite,
    handleArticle,
    handleArticle2,
    getArticles
}