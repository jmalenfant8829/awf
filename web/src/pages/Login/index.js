import React, { Component } from 'react'
import Button from '../../components/Button'
import BackgroundGradient from '../../components/BackgroundGradient'
import FullscreenForm from '../../components/FullscreenForm'
import TextInput from '../../components/TextInput'
import { connect } from 'react-redux'
import { logInuser } from '../../redux/auth/authActions'
import Alert from '../../components/Alert'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    const { user } = this.props

    if (user && user.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  onChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { username, password } = this.state

    this.props.loginUser({ username, password })
  }

  render () {
    if (this.props.success) {
      setTimeout(() => this.props.history.push('/dashboard'), 1000)
    }

    return (
          <BackgroundGradient>
              <FullscreenForm heading="LOG IN">
                  <Alert type="error" message={this.props.error} />
                  <Alert type="success" message={this.props.success} />

                  <TextInput type="text" name="username" placeholder="Username" onChange={this.onChange} />
                  <TextInput type="password" name="password" placeholder="Password" onChange={this.onChange} />

                  <Button size="fullwidth" color="primary" onClick={this.onSubmit}>Log in</Button>
              </FullscreenForm>
          </BackgroundGradient>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.self,
  success: state.success.login,
  error: state.error.login
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (credentials) => dispatch(logInuser(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
