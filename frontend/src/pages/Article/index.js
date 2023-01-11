import { PureComponent } from 'react'
import { connect } from 'react-redux'
import *   as action from "../../actions/article"
import { Link } from "react-router-dom"
import ArticleAction from './ArticleAction'
import { marked } from 'marked'
import Comments from '../Comments'
//文章详情
class Article extends PureComponent {

    componentDidMount() {
        const slug = this.props.match.params.slug
        // 根据文章slug 获取文章
        this.props.getArticleBySlug(slug)
    }
    render() {
        const { article, currentUser } = this.props
        const { slug, title, body, tags, author, createdAt } = article
        if (!body) {
            return null
        }

        const markdata = body
        const markhtml = marked.parse(markdata, { sanitize: true })
        const markObj = {__html:markhtml}
        return (
            <div className='article-page'>
                {/* 文章头信息 */}
                <div className='banner'>
                    <div className='container'>
                        <h1>{title}</h1>
                        <div className='article-meta'>
                            <div className='info'>
                                <Link to={`/profile/${author && author.username}`}>
                                    <img src={author && author.avatar || "https://wx3.sinaimg.cn/mw2000/006HdJ1kly1h6x7ft0mn1j32c03407wj.jpg"} alt={author && author.username} />
                                </Link>
                            </div>
                            <div className='info'>
                                <Link to={`/profile/${author && author.username}`}>
                                    {author && author.username}
                                </Link>
                                {"  "}
                                <span>
                                    {new Date(createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            {/* button 行为 */}
                            <ArticleAction article={article} currentUser={currentUser} />
                        </div>
                    </div>
                </div>
                {/* 文章信息 :内容和标签a*/}
                <div className='row article-content'>
                    <div className='col-xs-12'>
                        {/* 文章内容 */}
                        <div dangerouslySetInnerHTML={markObj}></div>
                        {/* 文章标签 */}
                        <ul>
                            {
                                tags.map(tag=>{
                                    return (
                                        <li
                                          className='tag-default tag-pill'
                                          key={tag}
                                        >
                                            {tag}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                {/* 评论信息 */}
                {/* 评论信息：
                未登录 ： 登录和注册 /  评论列表正常显示
                已登录 ； 添加评论 / 评论列表 */}
                <Comments slug={slug} currentUser={currentUser}/>
            </div>
        )

    }
}

const mapState = state => ({
    article: state.article,
    currentUser: state.user.login.currentUser
})
const mapDispatch = dispatch => ({
    getArticleBySlug: (slug) => dispatch(action.getArticleBySlug(slug)),
    unload: () => dispatch(action.articleUnload())

})
export default connect(mapState, mapDispatch)(Article)
