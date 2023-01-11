const express =require('express')
const router =express.Router()
const {createTag,getTags,deleteTag} = require('../controller/tag')
const authMiddleware = require('../middleware/auth.middleware')

//创建标签
router.post('/',authMiddleware,createTag)
//获取标签
router.get('/',getTags)
//删除标签
router.delete('/:tag',authMiddleware,deleteTag)
module.exports=router