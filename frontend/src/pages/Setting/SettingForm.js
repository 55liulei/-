import {PureComponent} from 'react'
import * as action from '../../actions/setting'
import { connect } from 'react-redux'
class settingForm extends PureComponent {
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
    changeAvatar = (e) => {
        // this.setState({
        //     email: e.target.value
        // })
        this.props.onAvatarChange('avatar', e.target.value)
    }
    changeBio = (e) => {
        // this.setState({
        //     email: e.target.value
        // })
        this.props.onBioChange('bio', e.target.value)
    }
    changePassword = (e) => {
        // this.setState({
        //     password:e.target.value
        // })
        this.props.onPasswordChange('password', e.target.value)
    }
    onSubmit = (e) => {
        const { username, password,avatar,bio } = this.props
        e.preventDefault()
        // console.log('11111');
        //提交数据

        this.props.onSubmitUser({ username, password,avatar,bio })
        // console.log('submit', email, username, password);
    }
    render() {
        const { username, password,avatar,bio} = this.props
        return (
          
                        <form onSubmit={this.onSubmit}>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户名称'
                                    value={username || ""}
                                    onChange={this.changeUserName}
                                />
                            </fieldset>
                           
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户头像'
                                    value={avatar|| ""} 
                                    onChange={this.changeAvatar}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <textarea
                                    className='form-control form-control-lg'
                                    rows='8'
                                    placeholder='用户简介'
                                    type="text"
                                    value={bio || ""}
                                    onChange={this.changeBio}
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
                                更新
                            </button>
                        </form>
        )
    }
}
    // componentDidMount(){
    //     //用户信息初始化 ： 数据回显
    // }
// 增强state  把仓库的子模块子reducer =》user的state =》映射到regist组件的props
const mapStateToProps = state => ({
    ...state.user.setting
})
// 增强 方法：定义dispatch方法
const mapDispatch = dispatch => ({
    //dispatch-action-thunk(函数，对象) -store-reducer-state(new)-mapstate=render
    onUsernameChange: (key, value) => dispatch(action.settingFiledUpdate(key, value)),
    onPasswordChange: (key, value) => dispatch(action.settingFiledUpdate(key, value)),
    onAvatarChange: (key, value) => dispatch(action.settingFiledUpdate(key, value)),
    onBioChange: (key, value) => dispatch(action.settingFiledUpdate(key, value)),
    onSubmitUser: (user) => dispatch(action.settingSubmit(user)),
    onUnload: () => dispatch(action.settingUnload())
})
export default connect(mapStateToProps, mapDispatch)(settingForm)  
