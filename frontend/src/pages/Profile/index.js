import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getProfile, addFollow, deleteFollow } from '../../actions/profile'
import { getArticlesByAuthor, getArticlesByFavorite } from "../../actions/articles"
import ButtonInfo from './ButtonInfo'
import Articles from '../Articles'

class Profile extends PureComponent {
    state = {
        tab: 1
    }
    render() {
        const { profile, currentUser, onFollow, onUnFollow, articlesReducer } = this.props;
        const { articles, currentPage, count } = articlesReducer
        //判断： 登录用户 和 profile 是否是同一个人
        const isCurrentUser = currentUser && currentUser.username === profile.username
        return (
            <div className='profile-page'>

                {/* 1 用户信息 */}
                <div className='user-info'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-md-10 offset-md-1'>
                                {/* 1.1 用户基本：头像 用户名 简介 */}
                                <img src={profile.avatar || "https://wx3.sinaimg.cn/mw2000/006HdJ1kly1h6x7ft0mn1j32c03407wj.jpg"} style={{ width: 100, height: 100 }} alt="" />
                                <h4>{profile.username}</h4>
                                <p>{profile.bio}</p>

                                {/* 1.2 用户行为：自己页面 编辑设置； 不是自己页面 关注/取消关注 */}
                                <ButtonInfo
                                    isCurrentUser={isCurrentUser}
                                    profile={profile}
                                    follow={onFollow}
                                    unfollow={onUnFollow}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 用户文章 : 用户自己的文章  / 用户喜欢的文章*/}
                <div className='container'>
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            {/* 选项卡 */}
                            <div className='aticles-toggle'>
                                <ul className="nav nav-pills outline-active">
                                    <li className='nav-item'>
                                        <button
                                            className={this.state.tab === 1 ? "nav-link active" : "nav-link"}
                                            onClick={
                                                () => {
                                                    this.setState({
                                                        tab: 1
                                                    })
                                                    this.props.getArticlesByAuthor(profile.username)
                                                }
                                            }
                                        >
                                            我的文章
                                        </button>
                                    </li>
                                    <li className='nav-item'>
                                        <button
                                            className={this.state.tab === 2 ? "nav-link active" : "nav-link"}
                                            onClick={
                                                () => {
                                                    this.setState({
                                                        tab: 2
                                                    })

                                                    this.props.getArticlesByFavorite(profile.username)
                                                }
                                            }
                                        >
                                            关注作者的文章
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* 文章列表 */}
                            <Articles
                                articles={articles}
                                count={count}
                                currentPage={currentPage}
                                isShowPage={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate(preProps) {
        // 实际的项目中不会出现 手动输入地址的情况
        const username = this.props.match.params.username
        if (username && username !== this.props.profile.username) {
            this.props.getProfile(username)
        }
    }

    componentDidMount() {
        // 获取路由参数
        const username = this.props.match.params.username
        //获取profile
        this.props.getProfile(username)
        //获取用户的文章
        this.props.getArticlesByAuthor(username)
    }
}

const mapState = state => ({
    currentUser: state.user.login.currentUser,
    profile: state.profile,
    articlesReducer: state.articlesReducer
})

const mapDispatch = dispatch => ({
    getProfile: username => dispatch(getProfile(username)),
    onFollow: (username) => dispatch(addFollow(username)),
    onUnFollow: (username) => dispatch(deleteFollow(username)),
    getArticlesByAuthor: (username) => dispatch(getArticlesByAuthor(username, 1)),
    getArticlesByFavorite: (username) => dispatch(getArticlesByFavorite(username, 1)),
})

export default connect(mapState, mapDispatch)(Profile)