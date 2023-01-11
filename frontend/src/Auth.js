import {Redirect} from 'react-router-dom'

const Auth = props=>{
    const {currentUser,children} = props
    if(currentUser){ //已登录 =》已授权=〉可以访问子组件
        return children
    }
    return <Redirect to='/login' />
}
export default Auth