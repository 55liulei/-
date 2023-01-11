const express =require('express')
const router =express.Router()
const {createComment,getComments,deleteComment} = require('../controller/comment')
const authMiddleware = require('../middleware/auth.middleware')

//添加评论
router.post('/:slug',authMiddleware,createComment)
//获取评论
router.get('/:slug',getComments)
//删除评论
router.delete('/:slug/:id',authMiddleware,deleteComment)
module.exports=router