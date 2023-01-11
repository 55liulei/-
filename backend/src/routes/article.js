const express =require('express')
const router =express.Router()
const {createArticle,getArticle,updateArticle, deleteArticle, getFollowArticles,getArticles} = require('../controller/article')
const authMiddleware = require('../middleware/auth.middleware')

//创建文章
router.post('/',authMiddleware,createArticle)
router.get('/follow',authMiddleware,getFollowArticles)
router.get('/:slug',authMiddleware,getArticle)
router.get('/',getArticles)
router.put('/:slug',authMiddleware,updateArticle)
router.delete('/:slug',authMiddleware,deleteArticle)

module.exports=router