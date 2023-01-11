//node - model -sequelize - mysql
const { DataTypes } = require('sequelize')
const sequelize = require('../db/sequelize')
const Article= sequelize.define('article', {
    slug: {//id:文章别名
        type: DataTypes.STRING,//数据类型
        primaryKey: true,//唯一
        allowNull: false,//非空
    },
    title: {//标题
        type: DataTypes.STRING,//数据类型
        // unique: "username",//允许重复
        allowNull: false,//非空
    },
    description: {//描述
        type: DataTypes.STRING,//数据类型
        allowNull: false,//非空

    },
    body: {//文章内容
        type: DataTypes.TEXT,
        allowNull: false
    }
   
})

module.exports=Article