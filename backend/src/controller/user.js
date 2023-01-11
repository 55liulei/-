const HttpException = require("../exception/http.exception");
const User = require("../model/user");
const { sign } = require("../utils/jwt");
const { md5Password, matchPassword } = require("../utils/md5");
const { validateCreateUser, validateLoginUser } = require("../utils/validate/user.validate")
//注册
const createUser = async (req, res, next) => {
    try {
        //01获取数据

        const { email, username, password } = req.body.user
        // console.log(email, username, password);
        //02 验证数据：检查数据是否合理
        //前端校验-后端接口校验-数据校验
        const { error, validate } = validateCreateUser(email, username, password)
        if (!validate) {
            throw new HttpException(401, '用户提交数据校验失败', error)
        }
        //03业务
        //3.1 用户是否注册：email是否在数据库存在
        const emailUser = await User.findByPk(email)
        if (emailUser) {
            throw new HttpException(401, "用户邮箱已注册", 'user already regist')
        }
        //3.2用户名是否唯一：username 去数据库查询=》有或者没有
        const usernameUser = await User.findOne({
            where: {//mysql语句
                username
            }
        })
        if (usernameUser) {
            throw new HttpException(401, "用户名不能重复", "username already exist")
        }
        //04用户密码加密 ： 单向数据加密 不可逆 123 加盐- 111 
        const md5PWD = md5Password(password)
        // console.log(md5PWD);
        // console.log(matchPassword("207acd61a3c1bd506d7e9a4535359f8a", "123456"));
        //05创建用户
        const user = await User.create({
            email: email,
            username,
            password: md5PWD
        })
        // console.log(user);
        //06响应数据

        //6.1 响应数据处理 :自定义处理
        let data = {}
        data.email = user.email
        data.username = user.username

        //6.2 响应数据

        res
            .status(200)
            .json({
                status: 1,//合理
                message: "success",//注册用户成功
                data: data
            })
    } catch (error) {
        //error是HttpException
        next(error)
    }

}

//登录
const loginUser = async (req, res, next) => {
    try {
        //01获取数据：邮箱，密码
        const { email, password } = req.body.user

        //02验证数据
        const { error, validate } = validateLoginUser(email, password)
        if (!validate) {
            throw new HttpException(401, '用户提交数据校验失败', error)
        }

        //03验证账号是否存在：验证邮箱账号
        const emailUser = await User.findByPk(email)
        if (!emailUser) {
            throw new HttpException(401, "用户不存在", 'user not found')
        }
        //04验证密码：登陆密码和账号对应的数据库密码比较
        const oldMD5PWD = emailUser.password
        const match = matchPassword(oldMD5PWD, password)
        if (!match) {
            throw new HttpException(401, "用户密码不匹配", 'password not match')
        }
        // console.log(match);
        //05生成token:给客户端发布令牌（标记）
        //client -login-server(token) 钥匙 （secret）
        //client(token)--->server 钥匙解锁  
        //根据密钥生成token;根据密钥验证token
        const username = emailUser.username
        const token = await sign(username, email)
        // console.log(token);
        //06响应数据：响应用户信息+token 注意：去除密码
        delete emailUser.dataValues.password
        emailUser.dataValues.token = token
        // console.log(emailUser);

        res
            .status(200)
            .json({
                status: 1,//合理
                message: "登录用户成功",//登录用户成功
                // data: token
                data: emailUser.dataValues
            })
    } catch (error) {
        //07捕获错误：同意错误中间件处理
        next(error)
    }


}

//获取用户 token
const getUser = async (req, res, next) => {
    try {
        //01 获取用户邮箱
        const { email, } = req.user
        //02 验证
        //03 获取用户信息
        const user = await User.findByPk(email)
        if (!user) {
            throw new HttpException(401, "用户不存在", 'user not found')
        }

        //04 返回处理
        delete user.dataValues.password
        // console.log(user);
        //05响应数据
        res
            .status(200)
            .json({
                status: 1,//
                message: "获取用户成功",
                data: user.dataValues
            })
    } catch (error) {
        //07捕获错误：同意错误中间件处理
        next(error)
    }
}
// 获取用户 : username
const getUserByUsername = async (req, res, next) => {
    try {
        // 01 获取用户username
        const username = req.params.username
        // console.log(username);
        // 验证
        if (!username) {
            throw new HttpException(404, '请求用户名参数不存在', 'username not found')
        }

        // 获取用户信息
        const user = await User.findOne({
            where:{
                username:username
            },
            include:['followers']
        })

        if (!user) {
            throw new HttpException(401, '用户不存在', 'user not found')
        }
        //当前登录用户是否是粉丝 => 是否已经关注
        //当前登录者为张三1 查看他 是否关注了 C
        let { email } = req.user
        // let follower = await Follower.find({ userEmail: email })

        // console.log(follower);

        let following = false
        let followers = []

        for (const follower of user.followers) {
            // console.log(item);
            if (email === follower.email) {
                following = true
            }
            delete follower.dataValues.password
            delete follower.dataValues.Followers
            followers.push(follower)
        }

        const profile = {
            username: user.username,
            bio: user.bio,
            avatar: user.avatar,
            following,
            followers
        }
        //响应数据
        res.status(200).json({
            status: 1,
            message: '获取用户成功',
            data: profile
        })
    } catch (error) {
        next(error)
    }
}

//更新用户 01 先登录（authmiddleware），
const updateUser = async (req, res, next) => {
    try {
        //01 获取数据 : 账号email
        const { email } = req.user
        // console.log(email);
        //02 更新账号 ： 是否存在
        const user = await User.findByPk(email)
        if (!user) {
            throw new HttpException(401, '用户不存在', 'user not found')
        }
        //03 获取更新数据 ：body.user
        const bodyUser = req.body.user
        // console.log(bodyUser);
        if (!bodyUser) {
            throw new HttpException(401, '需要提交更新数据', 'update user info is required')
        }
        const { username, avatar, bio } = bodyUser
        let password = bodyUser.password ? md5Password(bodyUser.password) : undefined
        //04 校验更新数据
        // const usernameUser = await User.findOne({
        //     where: {//mysql语句
        //         username
        //     }
        // })
        // if (usernameUser) {
        //     throw new HttpException(401, "用户名已占用", "username already exist")
        // }
        //05 更新数据
        // 法一 适合批量更新
        // const updateUser = await User.update({ username, password, avatar, bio }, {
        //     where: {
        //         email
        //     }
        // })
        // 法二 实例方法
        const updateUser = await user.update({ username, password, avatar, bio })
        // console.log(updateUser);
        //06 重新生成token 因为信息已经改变
        const token = await sign(updateUser.username, email)
        //07 响应数据
        // 07-1 处理响应数据
        delete updateUser.dataValues.password
        updateUser.dataValues.token = token
        res
            .status(200)
            .json({
                status: 1,//
                message: "更新用户成功",
                data: updateUser.dataValues
            })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createUser,
    loginUser,
    getUser,
    updateUser,
    getUserByUsername
}