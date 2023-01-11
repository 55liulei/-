import { PureComponent } from 'react';
import Errors from '../../components/Errors'
import * as action from '../../actions/article'
import {connect} from 'react-redux'


class ArticleEdit extends PureComponent {
    changeTitle = (e) => {
        this.props.changeTitle('title', e.target.value )
    }
    changeDesc = (e) => {
        this.props.changeDesc('description', e.target.value )
    }

    changeBody = (e) => {
        this.props.changeBody('body', e.target.value )
    }

    changeTag = (e) => {
        this.props.changeTag('tag', e.target.value )
    }
    
    watchEnter = (e) => {
        // this.props.onEmailChange('email', e.target.value )
        // console.log(e.keyCode);
        if(e.keyCode===13){
            e.preventDefault()
            this.props.addTag()
        }
    }

    removeTag = (tag) => {
        return (ev)=>{
            this.props.removeTag(tag)
        }
    }

    onSubmitForm = (article) => {
      this.props.updateArticle(article)
    }

    render() {
        console.log('111111');
        const {slug,title,description,body,tag,tags,errors} = this.props
        return (
            <div className='editor-page'>
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <h1>编辑文章</h1>
                            <Errors errors={errors} />

                            <form >
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章标题'
                                        value={title||""}
                                        onChange={this.changeTitle}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章描述'
                                        value={description||""}
                                        onChange={this.changeDesc}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <textarea
                                        className='form-control form-control-lg'
                                        rows={12}
                                        placeholder='用markdown编辑文章'
                                        value={body||""}
                                        onChange={this.changeBody}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='输入标签'
                                        value={tag||""}
                                        onChange={this.changeTag}
                                        onKeyUp={this.watchEnter}
                                    />
                                    
                                    {
                                        tags.map(tag=>{
                                            return (
                                                <span 
                                                className='tag-default tag-pill' 
                                                key={tag} >
                                                    <i className="fa  fa-trash-o fa-lg" 
                                                    onClick={this.removeTag(tag)}
                                                    />
                                                    {tag}
                                                </span>
                                            )
                                        })
                                    }
                                </fieldset>
                                <button
                                    className='btn btn-lg btn-primary pull-xs-right'
                                    type='button'
                                    onClick={
                                            (e)=>{
                                                e.preventDefault()
                                                this.onSubmitForm({slug,title,description,body,tags})
                                            }
                                        }
                                >
                                    更新文章
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        // console.log(11);
        // 重新获取文章数据
        const slug  =this.props.match.params.slug
        // console.log('componentDidMount',slug);
        this.props.getArticleBySlug(slug)
    }

    componentWillUnmount(){
        this.props.unload()
    }
}

const mapState=state=>({
    ...state.article
})

const mapDispatch = dispatch=>({
    getArticleBySlug: (slug) => dispatch(action.getArticleBySlug(slug)),

    changeTitle:(key,value)=>dispatch(action.articleFiledUpdate(key,value)),
    changeDesc:(key,value)=>dispatch(action.articleFiledUpdate(key,value)),
    changeBody:(key,value)=>dispatch(action.articleFiledUpdate(key,value)),
    changeTag:(key,value)=>dispatch(action.articleFiledUpdate(key,value)),

    addTag:()=>dispatch(action.articleAddTag()),
    removeTag:(tag)=>dispatch(action.articleRemoveTag(tag)),
    updateArticle:(article)=>dispatch(action.updateArticle(article)),
    unload:()=>dispatch(action.articleUnload())
})

export default connect(mapState,mapDispatch)(ArticleEdit)