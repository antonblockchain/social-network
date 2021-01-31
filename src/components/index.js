import React, { Suspense } from 'react'
import './index.css'
import '../App.css';
import Login from './Login/Login'
import HeaderContainer from './Header/HeaderContainer'
import { Link, Route, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { ProfileThunk } from './Login/auth-reducer'
import { compose } from 'redux';
import LazyHOC from './hoc/LazyLoaderHOC'

const UsersContainer = React.lazy(()=> import( './Users/UsersContainer'))
const Dialog = React.lazy(()=> import( './Dialog/Dialog'))
const ProfileContainer = React.lazy(()=> import('./Profile/ProfileContainer'))
const PostsContainer = React.lazy(()=> import('./Posts/PostsContainer'))

class App extends React.Component {
    
  componentDidMount(){
    this.props.ProfileThunk()
  }

 render(){
  return (
    <div className="App">
      <HeaderContainer />
      <nav className='links'>
        <Link  to='/profile'>Profile</Link>
        <Link  to='/dialog'>Dialog</Link>
        <Link  to='/users'>Users</Link>
        <Link  to='/posts'>Posts</Link>
      </nav>
    <Switch>
      <Route path='/profile/:userId?' render={LazyHOC(ProfileContainer)}/>
      <Route path='/dialog' render={LazyHOC(Dialog)}/>
      <Route path='/users' render={LazyHOC(UsersContainer)} />
      <Route path='/login' render={()=> <Login />} />
      <Route path='/posts' render={LazyHOC(PostsContainer)} />
    </Switch>
    </div>

  );
}
}

export default compose(
  withRouter,
  connect(null, {ProfileThunk})) (App)
