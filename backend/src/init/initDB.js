const dbConnection = require("../db/connection")
const sequelize = require("../db/sequelize")
const User = require("../model/user")
const Article = require("../model/article")
const Comment = require("../model/comment")
const Tag = require("../model/tag")

//模型关系
//A.hasOne(B)  A有一个B
//A.belongTo(B) A属于B
//A.hasMany(B) A有多个B
//A.belongToMany(B，中间表) A属于多个B


const initRelation = () => {
    //用户（作者）和文章
    //分析：一对多
    User.hasMany(Article, {
        onDelete: "CASCADE"//关联文章也删除
    })
    Article.belongsTo(User)

    //用户(评论人)和评论
    //分析：一对多
    User.hasMany(Comment, {
        onDelete: "CASCADE"//关联评论也删除
    })
    Comment.belongsTo(User)

    //用户（喜欢文章）和文章
    //分析：一个用户喜欢多篇文章，一篇文章可以被多个用户喜欢  多对多
    User.belongsToMany(Article, {
        through: "favorites",
        uniqueKey: false,
        timestamps: false
    })
    Article.belongsToMany(User, {
        through: "favorites",
        uniqueKey: false,
        timestamps: false
    })

    //用户（粉丝）和用户（作者）
    //分析：用户（粉丝）可以关注多个用户（作者），用户（作者）也可以关注多个用户（粉丝）
    User.belongsToMany(User, {
        through: "Followers",//自动创建
        as: "followers",//别名
        timestamps: false
    })
    //自我关联，写一个就行

    //文章和标签
    //分析：多对多
    Article.belongsToMany(Tag, {
        through: "TagList",//中间表
        uniqueKey: false,
        timestamps: false
    })
    Tag.belongsToMany(Article, {
        through: "TagList",
        uniqueKey: false,
        timestamps: false
    })

    //文章和评论
    //分析：一个文章有多个评论，一个评论只能属于某一个文章
    Article.hasMany(Comment,{
        onDelete: "CASCADE",
    })
    Comment.belongsTo(Article)

}
const initDB = () => {
    return new Promise(async (resolve, reject) => {
        try {

            //数据库连接
            await dbConnection()
            //初始化模型 :模型关系
            initRelation()
            //同步数据库:同步模型（建表/表关系）
            // await sequelize.sync()
            // await sequelize.sync({force:true})//强制删表，重新建立
            await sequelize.sync({alter:true})

            resolve()
        } catch (error) {
            console.log(`mysql connect fail on ${process.env.DB_PORT}`);
        }
    })
}
module.exports = initDB