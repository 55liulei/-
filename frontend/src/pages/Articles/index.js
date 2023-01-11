import Item from './Item'
import Pagination from './Pagination';


const Articles = props => {
    const { articles, count, currentPage, onPageClick, isShowPage } = props
    if (!articles) {
        return (
            <div className='article-preview'>
                加载中...
            </div>
        )
    }
    if (articles && articles.length === 0) {
        return (
            <div className='article-preview'>
                没有文章
            </div>
        )
    }
    return (
        // 文章数据
        <div>
            {
                articles.map(article => {
                    return <Item article={article} key={article.slug} />
                })
            }
            {/* 分页数据 */}
            {
                isShowPage ? <Pagination
                    count={count}
                    currentPage={currentPage}
                    onPageClick={onPageClick}
                /> : null
            }


        </div>
    )
}
export default Articles