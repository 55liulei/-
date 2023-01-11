import { memo } from "react"
import { Link } from "react-router-dom"

const CommentItem = (props) => {
    const { comment, currentUser, deleteComment, slug } = props
    //评论人和登录人是一个人：具备删除评论权限
    const showDelete = currentUser && comment && currentUser.username === comment.user.username
    return (
        <div className="card">
            {/* 评论内容 */}
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
            </div>
            {/* 评论信息 */}
            <div className="card-footer">
                <Link to={`/profile/${comment.user.username}`}>
                    <img
                        className="comment-author-img"
                        src={comment.user.avatar || "https://wx3.sinaimg.cn/mw2000/006HdJ1kly1h6x7ft0mn1j32c03407wj.jpg"}
                        alt={comment.user.username}

                    />
                </Link>
                {" "}
                <Link to={`/profile/${comment.user.username}`}>
                    {comment.user.username}
                </Link>
                {"  "}
                <span>
                    {new Date(comment.createdAt).toLocaleDateString()}
                </span>
                {/* 删除按钮 */}
                {
                    showDelete ?
                        <button
                            className="mod-options btn-danger"
                            onClick={()=>{deleteComment(slug,comment.id)}}
                        >删除</button> : null
                }
            </div>
        </div>
    )
}
export default memo(CommentItem)