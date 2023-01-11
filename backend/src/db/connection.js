const sequelize=require("./sequelize")
//重构连接数据库服务
const dbConnection =  () => {
    return new Promise( async(resolve, reject) => {
        try {
            await sequelize.authenticate()
            console.log(`mysql connect success on ${process.env.DB_PORT}`);
            resolve()
        } catch (error) {
            console.log(`mysql connect fail:`,error );
            reject()
        }
        
        })
    }
module.exports=dbConnection