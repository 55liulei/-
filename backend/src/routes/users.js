const express =require('express')
const router =express.Router()
const {createUser,loginUser,getUser,updateUser,getUserByUsername}=require('../controller/user')
const authMiddleware = require('../middleware/auth.middleware')
//用户路由模块

//注册：创建用户
router.post('/',createUser)
//登录
router.post('/login',loginUser)
//获取用户信息 token
router.get('/',authMiddleware,getUser)
//获取用户信息 username
router.get('/:username',authMiddleware,getUserByUsername)
//更新
router.put('/',authMiddleware,updateUser)
// //test
// router.get('/',testController)

module.exports=router