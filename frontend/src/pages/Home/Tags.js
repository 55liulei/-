import { memo } from "react";
import { connect } from "react-redux";
import { syncPage, syncTag, getTabArticles, syncTab } from '../../actions/home'
const Tags = memo((props)=>{
    const {tags} = props
    if(tags){
        return(
            <div className="tag-list">
                {
                    tags.map(tag=>{
                        return(
                            <button
                               type="button"
                               className="tag-dafault tag-pill"
                               key={tag}
                               onClick={()=>{
                                    props.syncTab(null)
                                    props.syncTag(tag)
                                    props.syncPage(1)
                                    props.onTabClick()
                               }}
                            >
                                {tag}
                            </button>
                        )
                    })
                }
            </div>
        )
    }else{
        return <div>加载标签中....</div>
    }
})

const mapDispatch = dispatch => ({
    syncTag: (tab) => dispatch(syncTag(tab)), //同步tab
    syncPage: (page) => dispatch(syncPage(page)), //同步page
    onTabClick: () => dispatch(getTabArticles()), //获取tab文章列表
    syncTab:(tab)=>dispatch(syncTab(tab))
})

export default connect(null,mapDispatch)(Tags) 
