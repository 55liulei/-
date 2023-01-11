import { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Errors from '../../components/Errors'
import * as action from '../../actions/user'
import { connect } from 'react-redux'


class Regist extends PureComponent {
    changeEmail = (e) => {
        // this.setState({
        //     email: e.target.value
        // })
        this.props.onEmailChange('email', e.target.value)
    }
    changeUserName = (e) => {
        // this.setState({
        //     username:e.target.value
        // })
        this.props.onUsernameChange('username', e.target.value)
    }
    changePassword = (e) => {
        // this.setState({
        //     password:e.target.value
        // })
        this.props.onPasswordChange('password', e.target.value)
    }
    onSubmit = (e) => {
        const { email, username, password } = this.props
        e.preventDefault()
        // console.log('11111');
        //提交数据

        this.props.onSubmitUser({email, username, password })
        // console.log('submit', email, username, password);
    }
    render() {
        const { email, username, password, errors } = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>注册</h1>
                        <p className='text-xs-center'>
                            <Link to="/login">
                                有账号直接登录？
                            </Link>
                        </p>
                        <Errors errors={errors} />
                        <form onSubmit={this.onSubmit}>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='请输入用户邮箱'
                                    value={email}
                                    onChange={this.changeEmail}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户名称'
                                    value={username}
                                    onChange={this.changeUserName}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="password"
                                    placeholder='用户密码'
                                    value={password}
                                    onChange={this.changePassword}
                                />
                            </fieldset>
                            <button
                                className='btn btn-lg btn-primary pull-xs-right'
                                type='submit'
                            >
                                注册
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    componentWillUnmount(){
        this.props.onUnload()
    }
}

// 增强state  把仓库的子模块子reducer =》user的state =》映射到regist组件的props
const mapStateToProps = state => ({
    ...state.user.regist
})
// 增强 方法：定义dispatch方法
const mapDispatch = dispatch => ({
    onEmailChange: (key, value) => dispatch(action.registFiledUpdate(key, value)), //=>dispatch({type:constant.USER_REGIST_FIELD,key,value})
    onUsernameChange: (key, value) => dispatch(action.registFiledUpdate(key, value)),
    onPasswordChange: (key, value) => dispatch(action.registFiledUpdate(key, value)),
    onSubmitUser: (user) => dispatch(action.registSubmit(user)),
    onUnload: () => dispatch(action.registUnload())
})
export default connect(mapStateToProps, mapDispatch)(Regist) 