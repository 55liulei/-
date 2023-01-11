
//重构node服务
const initServer =  (app) => {
    return new Promise(async(resolve, reject) => {

        const PORT = process.env.PORT || 8000
        const HOST = process.env.HOST || localhost
        app
        .listen(PORT, () => {
            console.log(`server is running on http://${HOST}:${PORT}`);
            resolve()
        })
        .on("error",(error)=>{
            console.log(error);
            reject()
        })
    })
}
module.exports=initServer