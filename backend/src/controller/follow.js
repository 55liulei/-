const HttpException = require("../exception/http.exception");
const User = require("../model/user");


//控制器：添加关注 A（登录用户）关注B （被关注者）
const follow = async (req, res, next) => {
    try {
        // 01 验证登录 =》authmiddleware
        // 02 获取被关注者
          // 获取username
        const  beFollowUsername  = req.params.username
          // 获取用户
        const beFollower =  await User.findOne({
            where:{
                username:beFollowUsername
            }
        })
        if(!beFollower){
            return new HttpException(401,'被关注的用户不存在','user with this username not found')
        }
        // console.log(beFollower);
        // 03  获取关注者
          // 获取登录用户email
        const followerEmail = req.user.email
          // 获取登录用户
        const follower = await User.findByPk(followerEmail)
        if(!follower){
            return new HttpException(401,'登录用户不存在','user not found')
        }
        // console.log(follower);
        // 04  关注的规则判断  自己不能关注自己
        if(follower.email===beFollower.email){
            throw new HttpException(401,'无法关注自己','user can not follow yourself')
        }
        // 05  添加关注 ： B用户添加 A
          // console.log(beFollower.__proto__);
            await beFollower.addFollower(follower)
          // console.log(result);
        // 06  响应数据  
           // 返回被关注者信息 
           delete beFollower.dataValues.password
           beFollower.dataValues.following = true
        //    console.log(beFollower);
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "关注成功",
                data: beFollower
            })
    } catch (error) {
        next(error)
    }

}
//控制器：取消关注
const unfollow = async (req, res, next) => {
    try {
        // 01 验证登录 =》authmiddleware
        // 02 获取被关注者
          // 获取username
        const  beFollowUsername  = req.params.username
          // 获取用户
        const beFollower =  await User.findOne({
            where:{
                username:beFollowUsername
            }
        })
        if(!beFollower){
            return new HttpException(401,'被关注的用户不存在','user with this username not found')
        }
        // console.log(beFollower);
        // 03  获取关注者
          // 获取登录用户email
        const followerEmail = req.user.email
          // 获取登录用户
        const follower = await User.findByPk(followerEmail)
        if(!follower){
            return new HttpException(401,'登录用户不存在','user not found')
        }
        // console.log(follower);
        // 04  添加关注 ： B用户添加 A
          // console.log(beFollower.__proto__);
          await beFollower.removeFollower(follower)
          // console.log(result);
        // 05  响应数据  
           // 返回被关注者信息 
           delete beFollower.dataValues.password
           beFollower.dataValues.following = false
        //    console.log(beFollower);
        res
            .status(200)
            .json({
                status: 1,//合理
                message: "取消关注成功",
                data: beFollower
            })
    } catch (error) {
        next(error)
    }

}

module.exports = {
    follow,
    unfollow

}