import { PureComponent } from 'react';
import Errors from '../../components/Errors'
import { Link } from 'react-router-dom'
import * as action from '../../actions/user'
import { connect } from 'react-redux';
import { store } from '../../store'
import { replace } from 'connected-react-router'

class Login extends PureComponent {

    changeEmail = (e) => {
        this.props.onEmailChange('email', e.target.value)
    }
    changePassword = e => {
        this.props.onPasswordChange('password', e.target.value)
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { email, password } = this.props
        // 提交数据
        this.props.onSubmitUser(email, password)
    }

    render() {
        const { email, password, errors } = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>登录</h1>
                        <p className='text-xs-center'>
                            <Link to="/regist">
                                没有有账号直接注册？
                            </Link>
                        </p>

                        <Errors errors={errors} />
                        <form onSubmit={this.onSubmit}>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户邮箱'
                                    value={email}
                                    onChange={this.changeEmail}
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
                                登录
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate(preProps) {
        // console.log('this.props.redirect ', this.props.redirect);
        if (this.props.redirect && this.props.redirect !== preProps.redirect) {
            // 重定向到主页
            store.dispatch(replace(this.props.redirect))
        }
    }

    componentWillUnmount() {
        this.props.onUnload()
    }
}

const mapState = state => ({
    ...state.user.login  //user模块下子reducer
})

const mapDispatch = dispatch => ({
    onEmailChange: (key, value) => dispatch(action.loginFiledUpdate(key, value)),
    onPasswordChange: (key, value) => dispatch(action.loginFiledUpdate(key, value)),
    onSubmitUser: (email, password) => dispatch(action.loginSubmit(email, password)),
    onUnload: () => dispatch(action.loginUnload())
})

export default connect(mapState, mapDispatch)(Login)