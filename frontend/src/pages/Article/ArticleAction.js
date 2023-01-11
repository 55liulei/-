import { Link } from "react-router-dom"
import { memo } from 'react'
import { connect } from "react-redux";
import * as action from '../../actions/article'
const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const ArticleAction = memo((props) => {
    const { article, currentUser } = props
    const { slug, favoriteCount, favorited, author } = article
    if (currentUser) {//登录
        const isOWn = currentUser && author && currentUser.username === author.username
        if (isOWn) {//自己的文章
            return (
                <span>
                    <Link to={`/article/edit/${slug}`}>
                        <i className="ion-edit"></i>编辑
                    </Link>
                    {" "}
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => { 
                            props.deleteArticle(slug)
                        }}
                    >
                        <i className="ion-trash-a"></i>删除
                    </button>
                </span>
            )
        } else { //别人的文章
            return (
                <button
                    className={favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
                    onClick={()=>{
                        if(favorited){
                            props.unfavoriteArticle(slug)
                        }else{
                            props.favoriteArticle(slug)
                        }
                    }}
                >
                    <i className="fa fa-heart-o"></i> {favoriteCount}
                </button>
            )
        }
    } else {//未登录
        return (
            <button
                className="btn btn-outline-danger btn-sm"
            >
                <i className="ion-trash-a"></i>喜欢
            </button>
        )

    }
})
const mapState = state =>({

})
const mapDispatch = dispatch =>({
    deleteArticle:slug=>dispatch(action.deleteArticle(slug)),
    favoriteArticle:slug=>dispatch(action.favoriteArticle(slug)),
    unfavoriteArticle:slug=>dispatch(action.unfavoriteArticle(slug))
})
export default  connect(mapState,mapDispatch)(ArticleAction) 