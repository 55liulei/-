import { PureComponent } from 'react'
import * as action from '../../actions/setting'
import SettingForm from './SettingForm'
import { connect } from 'react-redux'
import Errors from '../../components/Errors'
import {store}  from "../../store"
import { replace } from 'connected-react-router'
class Setting extends PureComponent {
    handleClick = () => {
        this.props.onClickLogout()
    }
    render() {
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1 className='text-xs-center'>设置</h1>
                        <Errors errors={this.props.errors} />
                        <SettingForm />
                        <button
                            className='btn btn-outline-danger'
                            onClick={this.handleClick}
                        >
                            退出
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    // componentWillUnmount() {
    //     this.props.onUnload()
    // }
    componentDidUpdate(preProps){
        if(this.props.redirect && this.props.redirect !==preProps.redirect){
            store.dispatch(replace(this.props.redirect))
        }
    }
}
// 增强state  把仓库的子模块子reducer =》user的state =》映射到regist组件的props
const mapStateToProps = state => ({
    ...state.user.setting
})
// 增强 方法：定义dispatch方法
const mapDispatch = dispatch => ({
    onClickLogout: () => dispatch(action.settingLogout()),
    onUnload: () => dispatch(action.settingUnload())
})
export default connect(mapStateToProps, mapDispatch)(Setting)  
