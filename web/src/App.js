import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import './App.scss'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { decodeToken, destroyToken, getToken } from './utils/tokenUtils'
import { setUser } from './redux/user/userActions'
import { connect } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tokenChecked: false
    }
  }

  componentDidMount () {
    const token = getToken()

    if (token) {
      // Decode token
      const decoded = decodeToken(token)

      // If token is invalid, destroy it and mark the user as not authenticated
      if (!decoded) {
        destroyToken()
        this.props.setUser({ isAuthenticated: false })
        this.setState({
          tokenChecked: true
        })
        return
      }

      // If the token could be decoded, set the user's info
      this.props.setUser({
        isAuthenticated: true,
        ...decoded
      })
    }

    this.setState({
      tokenChecked: true
    })
  }

  render () {
    const { tokenChecked } = this.state

    if (!tokenChecked) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
})

export default connect(null, mapDispatchToProps)(App)
