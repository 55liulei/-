import { memo } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Menu = memo((props) => {
    const { currentUser } = props
    console.log(props);
    // console.log('currentUser--menu', currentUser);

    if (currentUser) { //登录
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        主页
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/article/new" className="nav-link">
                        写作
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/setting" className="nav-link">
                        设置
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile/${currentUser.username}`} className="nav-link">
                        <img src={currentUser.avatar || "https://img1.baidu.com/it/u=1458677519,904405135&fm=253&=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1668531600&t=098cd37e573afbb52387fdcabcc767aa"} className="user-pic" alt="图片走丢了" />
                    </Link>
                </li>
            </ul>
        )
    } else { // 未登录
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        主页
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        登录
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/regist" className="nav-link">
                        注册
                    </Link>
                </li>
            </ul>
        )
    }

})

const mapState = state => ({
    currentUser: state.user.login.currentUser
})

export default connect(mapState, null)(Menu)