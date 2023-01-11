//node - model -sequelize - mysql
const { DataTypes } = require('sequelize')
const sequelize = require('../db/sequelize')
const User= sequelize.define('user', {
    email: {//账号
        type: DataTypes.STRING,//数据类型
        primaryKey: true,//唯一
        allowNull: false,//非空
    },
    username: {//用户名
        type: DataTypes.STRING,//数据类型
        unique: "username",
        allowNull: false,//非空
    },
    password: {//密码
        type: DataTypes.STRING,//数据类型
        allowNull: false,//非空

    },
    avatar: {//头像
        type: DataTypes.TEXT,
        allowNull: true
    },
    bio:{//简介
        type:DataTypes.TEXT,
        allowNull:true
    }
})

module.exports=User