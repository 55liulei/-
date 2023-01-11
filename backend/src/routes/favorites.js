const express =require('express')
const router =express.Router()
const {addFavorite,removeFavorite} = require('../controller/favorite')
const authMiddleware = require('../middleware/auth.middleware')

//添加喜欢
router.post('/:slug',authMiddleware,addFavorite)
//删除喜欢
router.delete('/:slug',authMiddleware,removeFavorite)
module.exports=router