const { Sequelize } = require("sequelize")

//实例化sequelize(初始化链接配置)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false,//禁用日志记录
    }
)
module.exports=sequelize