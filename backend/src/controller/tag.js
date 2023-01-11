const HttpException = require("../exception/http.exception");
const Tag = require('../model/tag')
//创建标签
const createTag = async (req, res, next) => {
    try {

        const tag = req.body.tag
        // todo :校验
        if (!tag) {
            throw new HttpException(401, 'tag 标签必须提供', ' tag not found')
        }
        const result = await Tag.create({
            name: tag
        })
        console.log(result);
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "创建标签成功",
                data: result
            })
    } catch (error) {
        next(error)
    }
}

//获取所有标签
const getTags = async (req, res, next) => {
    try {
        const tagAll = await Tag.findAll()
        // console.log(tagAll); [{name:'react'},{name:'css'}]
        const tags = []
        if (tagAll.length > 0) {
            for (const tag of tagAll) {
                tags.push(tag.name)
            }
        }
        console.log(tags);
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "获取所有标签成功",
                data: tags
            })
    } catch (error) {
        next(error)
    }
}

//删除标签
const deleteTag = async (req, res, next) => {
    try {
        const tag = req.params.tag
        const result = await Tag.destroy({
            where: {
                name: tag
            }
        })
        console.log(result);
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "删除标签成功",
            })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createTag,
    getTags,
    deleteTag
}