import { lazy, Suspense, memo } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Auth from './Auth'
// import Login from './pages/Login'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
const Login = lazy(() => import('./pages/Login'))
const Regist = lazy(() => import('./pages/Regist'))
const ArticleNew = lazy(() => import('./pages/ArticleNew'))
const Article = lazy(() => import('./pages/Article'))
const Setting = lazy(() => import('./pages/Setting'))
const Profile = lazy(() => import('./pages/Profile'))
const ArticleEdit = lazy(() => import('./pages/ArticleEdit'))
//代码分割 = 多个包 并行 动态加载 =》 react 懒加载
//页面无关的组件 =》 拆分成新的buddle =》当无关组件需要被渲染的时候 才会去动态加载=》动态渲染
//性能优化
//1）React.lazy + import => 动态加载
//2) purecomponent /memo => 
const App= memo((props)=> {
  return (
    <div >
      {/* 应用的头部公共组件 */}
      <Header />
      {/* 主体页面 */}
      <Suspense fallback={<p>loading.....</p>}>
        <Switch>
          {/* 公开路由 */}
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/regist' component={Regist} />
          <Auth currentUser={props.currentUser}>
            <Switch>
              {/* 守护路由 */}
              <Route path='/article/new' component={ArticleNew} />
              <Route path='/article/edit/:slug' component={ArticleEdit} />
              <Route path='/article/:slug' component={Article} />
              <Route path='/setting' component={Setting} />
              <Route path='/profile/:username' component={Profile} />
            </Switch>
          </Auth>
        </Switch>
      </Suspense>
    </div>
  );
})
const mapState = state =>({
  currentUser:state.user.login.currentUser
})

export default  connect(mapState)(App)
