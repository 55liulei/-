## 1 。点击退出header仍然显示登录时候的状态
##  menu中current的取值是login中的currentuser 他的值没有被初始化清空

# 2 。第一次登陆后点击设置 信息消失，在网址中重新输入setting又回出现
##  在reducers中的setting默认返回
#       return {
#              ...initUser(),
#              errors:null,
#              currentUser:initUser(),
#              token:initToken()
#           }

# 3、访问别人主页时，点击自己头像 页面显示还是他们主页，但是路径url已经改变成功
#      // shouldComponentUpdate(nextProps,nextState){
#   //     const urlUserName = nextProps.match.params.username
#   //     // console.log(urlUserName);
#    //     // console.log(this.props.profile.username);
#    //     if(this.props.profile.username !==urlUserName){
#    //         return true
#    //     }
#    //     if(this.props.profile.username==nextProps.profile.username){
#    //         return false
#    //     }
#    //     return true
#    // }
#    // componentDidUpdate(){
#    //     const username = this.props.match.params.username
#    //     this.props.getProfile(username)
#    // }