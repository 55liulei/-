
const md5=require("md5")

const SALT='salt'

//1-md51
//2-md52
//123-md5123

//加密方法
const md5Password =(password)=>{
    const md5PWD = md5(password+SALT)
    return md5PWD
}

//密码匹配
//登录的场景：oldMD5PWD ，newPWD
const matchPassword =(oldMD5PWD ,newPWD)=>{
    //先把新密码转换为md5
    let newMD5PWD = md5Password(newPWD)
    if(newMD5PWD===oldMD5PWD){
        return true
    }
    return false
}
module.exports={md5Password,matchPassword}