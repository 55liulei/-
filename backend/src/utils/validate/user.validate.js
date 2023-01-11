

const validator=require('validator')


const validateCreateUser = (email,username,password)=>{
    let error={}
    if(!email){
        error.email="邮箱不能为空"
    }
    if(validator.isEmpty(username)){
        error.username="用户名不能为空"
    }
    if(validator.isEmpty(password)){
        error.password="密码不能为空"
    }
    if(email && !validator.isEmail(email)){
        error.email="email格式不对"
    }

    let validate=  Object.keys(error).length < 1 //true 验证通过
    return {
        error,
        validate
    }
}

const validateLoginUser = (email,password)=>{
    let error={}
    if(!email){
        error.email="邮箱不能为空"
    }
    
    if(validator.isEmpty(password)){
        error.password="密码不能为空"
    }
    if(email && !validator.isEmail(email)){
        error.email="email格式不对"
    }

    let validate=  Object.keys(error).length < 1 //true 验证通过
    return {
        error,
        validate
    }
}

module.exports={
    validateCreateUser,
    validateLoginUser
}