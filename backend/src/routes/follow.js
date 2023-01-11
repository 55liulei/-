const express =require('express')
const router =express.Router()
const {follow,unfollow} = require('../controller/follow')
const authMiddleware = require('../middleware/auth.middleware')

//添加关注
router.post('/:username',authMiddleware,follow)
//取消关注
router.delete('/:username',authMiddleware,unfollow)
module.exports=router