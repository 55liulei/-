import {PureComponent} from 'react'
import Banner  from './Banner'
import Tags  from './Tags'
import {getTags} from  '../../actions/home'
import { connect } from 'react-redux'
import Main from './Main'
class Home extends PureComponent {
    render(){
        return(    
            <div className='home-page'>
                {/* 上面是一个banner */}
                <Banner />
                {/* 下面 左：文章列表 右：标签 */}
                <div className='container page'>
                    <div className='row'>
                        {/* 文章列表 */}
                        <Main />
                        {/* 标签 */}
                        <div  className='col-md-3'>
                            <div className='sidebar'>
                                <p>热门标签</p>
                                <Tags tags={this.props.tags} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
       
    }
    componentDidMount(){
        this.props.getTags()
    }
}
const mapState = state=>({
      ...state.home
})
const mapDispatch = dispatch=>({
    getTags:()=>dispatch(getTags())
})
export default connect(mapState,mapDispatch) (Home)