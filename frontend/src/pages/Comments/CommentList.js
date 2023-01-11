import CommentItem from "./CommentItem"
import {memo } from 'react'

const CommentList = (props)=>{
    const {comments,currentUser,deleteComment,slug} = props
    if(comments.length===0){
        return <div>当前没有评论喔</div>
    }else{
        return(
            <div>
                {
                comments.map(comment=>{
                    return <CommentItem  
                      key={comment.id}
                      comment={comment}
                      deleteComment={deleteComment}
                      slug={slug}
                      currentUser={currentUser}
                    />
                })}
            </div>
        )
    }
}
export default memo(CommentList)