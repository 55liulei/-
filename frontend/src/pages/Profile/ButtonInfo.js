import { memo } from 'react'
import { Link } from 'react-router-dom'



const ButtonInfo = memo((props) => {
    const { isCurrentUser, profile ,follow,unfollow} = props

    const handleClick = (e)=>{
        e.preventDefault()
        if(profile.following){
            unfollow(profile.username)
        }else{
            follow(profile.username)
        }
    }

    if (isCurrentUser) { //访问自己的profile
        return (
            <Link
                to="/setting"
                className='btn btn-sm btn-outline-secondary action-btn'
            >
                <i className='fa fa-cog'></i>{" "}编辑设置
            </Link>
        )
    } else { //访问别人的profile
        return (
            <button
                className='btn btn-sm action-btn'
                className={profile.following ? 'btn-secondary' : 'btn-outline-secondary'}
                onClick={handleClick}
            >
                <i className='fa fa-user-plus'></i>{" "}
                {
                    profile.following ?"取消关注" : "添加关注"
                }
            </button>
        )
        

    }
})
export default ButtonInfo