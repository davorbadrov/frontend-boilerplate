import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from './views/login'
import SignUp from './views/signup'
import Home from './views/home'
import Profile from './views/profile'
import stores from './stores'
import { Provider, observer } from 'mobx-react'
import './App.css'

const UnauthenticatedRoutes = observer(() => {
  return (
    <Provider {...stores}>
      <Router>
        <div>
          <ul>
            <li><Link className="button is-text" to="/login">Login</Link></li>
            <li><Link className="button is-text" to="/signup">Sign up</Link></li>
          </ul>

          <hr/>

          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
        </div>
      </Router>
    </Provider>
  )
})

const AuthenticatedRoutes = observer(({stores}) => {
  return (
    <Provider {...stores}>
      <Router>
        <div>
          <ul>
            <li><Link className="button is-text" to="/">Home</Link></li>
            <li><Link className="button is-text" to="/profile">Profile</Link></li>
            <li><button className="button is-text" href="/" onClick={stores.userStore.logout}>Log out</button></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route exact path="/profile" component={Profile}/>
        </div>
      </Router>
    </Provider>
  )
})

const Routes = ({history}) => {
  // if user is loading, show loader
  if (stores.userStore.loading) {
    return <div>Loading...</div>
  }

  if (!stores.userStore.user) {
    return <UnauthenticatedRoutes />
  } else {
    return <AuthenticatedRoutes stores={stores} />
  }
}

export default observer(Routes)
