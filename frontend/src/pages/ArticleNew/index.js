import { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Errors from '../../components/Errors'
import * as action from '../../actions/article'
import { connect } from 'react-redux'
class ArticleNew extends PureComponent {
    changeTitle = (e) => {
        this.props.changeTitle('title', e.target.value)
    }
    changeDesc = (e) => {
        this.props.changeDesc('description', e.target.value)
    }
    changeBody = (e) => {
        this.props.changeBody('body', e.target.value)
    }
    changeTag = (e) => {
        this.props.changeTag('tag', e.target.value)
    }
    removeTag = (tag) => {
        return (ev) => {
            this.props.removeTag(tag)
        }
    }
    watchEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.props.addTag()
        }
    }
    onSubmitForm = (article) => {
        this.props.createArticle(article)
    }
    render() {
        const { title, description, body, tag, tags,errors} = this.props
        return (
            <div className='editor-page'>
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <h1>创建文章</h1>
                            <Errors errors={errors} />
                            <form onSubmit={this.onSubmit}>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章标题'
                                        value={title || ""}
                                        onChange={this.changeTitle}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章描述'
                                        value={description || ""}
                                        onChange={this.changeDesc}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <textarea
                                        className='form-control form-control-lg'
                                        rows={12}
                                        placeholder='用markdowm编辑文章'
                                        value={body || ""}
                                        onChange={this.changeBody}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='输入标签,回车确认标签'
                                        value={tag || ""}
                                        onChange={this.changeTag}
                                        onKeyUp={this.watchEnter}
                                    />

                                    {
                                        tags.map(tag => {
                                            return (
                                                <span
                                                    className='tag-default tag-pill'
                                                    key={tag}>
                                                    <i className='fa fa-trash-o fa-lg'
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
                                    onClick={() => {
                                        this.onSubmitForm({title,description,body,tags})
                                    }
                                    }

                                >
                                    发布文章
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
    componentWillUnmount(){
        this.props.unload()
    }
}

const mapState = state => ({
    ...state.article
})
const mapDispatch = dispatch => ({
    changeTitle: (key, value) => dispatch(action.articleFiledUpdate(key, value)),
    changeDesc: (key, value) => dispatch(action.articleFiledUpdate(key, value)),
    changeBody: (key, value) => dispatch(action.articleFiledUpdate(key, value)),
    changeTag: (key, value) => dispatch(action.articleFiledUpdate(key, value)),
    addTag: () => dispatch(action.articleAddTag()),
    removeTag: (tag) => dispatch(action.articleRemoveTag(tag)),
    createArticle: (article) => dispatch(action.createArticle(article)),
    unload:()=>dispatch(action.articleUnload())

})

export default connect(mapState, mapDispatch)(ArticleNew) 
