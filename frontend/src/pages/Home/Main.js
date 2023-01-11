import { memo, PureComponent } from "react";
import { connect } from "react-redux";
import { syncPage, syncTab, getTabArticles, syncTag } from '../../actions/home'
import Articles from '../Articles'
//选项卡 ： 关注作者的文章  需要登录
const YourTab = memo((props) => {
    const { currentUser, tab, onTabClick } = props
    if (!currentUser) {
        return null
    } else {
        const handleClick = e => {
            e.preventDefault()
            onTabClick('follow', 1)
        }
        return (
            <li
                className="nav-item"
            >
                <button
                    type="button"
                    className={tab === 'follow' ? 'nav-link active' : 'nav-link'}
                    onClick={handleClick}
                >
                    关注
                </button>
            </li>
        )
    }
})
//选项卡 ： 全局文章   未登录
const AllTab = memo((props) => {
    const { currentUser, tab, onTabClick } = props
    const handleClick = e => {
        e.preventDefault()
        onTabClick('all', 1)
    }
    if (currentUser) {
        return null
    } else { //未登录

        return (
            <li
                className="nav-item"
            >
                <button
                    type="button"
                    className={tab === 'all' ? 'nav-link active' : 'nav-link'}
                    onClick={handleClick}
                >
                    全部
                </button>
            </li>
        )
    }
})
//选项卡    全局文章 + 标签过滤
const TagTab = memo((props) => {
    const { tag } = props
    if (!tag) {
        return null
    }
    return (
        <li
            className="nav-item"
        >
            <button
                type="button"
                className={'nav-link active'}
            >
                <i className="fa fa-bookmark"></i>{tag}
            </button>
        </li>
    )
})
class Main extends PureComponent {
    handleTabChange = (tab, page) => {
        this.props.syncTab(tab)
        this.props.onTabClick()
        this.props.syncTag(null)
    }
    handlePageClick = (pageNum) => {
        //同步页码 当前页高亮 
        this.props.syncPage(pageNum)
        //请求当前页的数据
        this.props.onTabClick()

    }
    render() {
        return (
            <div className="col-md-9" >
                {/* 选项卡 */}
                <div className="feed-toggle">
                    <ul className="nav nav-pills outline-active">
                        <YourTab tab={this.props.tab} onTabClick={this.handleTabChange} currentUser={this.props.currentUser} />
                        <AllTab tab={this.props.tab} onTabClick={this.handleTabChange} currentUser={this.props.currentUser} />
                        <TagTab tag={this.props.tag} />
                    </ul>
                </div>
                {/* 文章列表 */}
                <Articles
                    articles={this.props.articles}
                    count={this.props.count}
                    currentPage={this.props.currentPage}
                    isShowPage={true}
                    onPageClick={this.handlePageClick}
                />
            </div>
        )
    }
    componentDidMount() {
        if (this.props.currentUser) {//登录
            this.props.syncPage(1) //同步页码
            this.props.syncTab('follow') //同步tab选项
            this.props.onTabClick() //获取tab对应文章列表
        } else {//未登录  
            this.props.syncPage(1) //同步页码
            this.props.syncTab('all') //同步tab选项
            this.props.onTabClick() //获取tab对应文章列表
        }
    }
}
const mapState = state => ({
    ...state.user.login,
    ...state.home
})
const mapDispatch = dispatch => ({
    syncTab: (tab) => dispatch(syncTab(tab)), //同步tab
    syncPage: (page) => dispatch(syncPage(page)), //同步page
    onTabClick: () => dispatch(getTabArticles()),//获取tab文章列表
    syncTag:(tag)=>dispatch(syncTag(tag))
})
export default connect(mapState, mapDispatch)(Main)