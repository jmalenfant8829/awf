import React, { Component } from 'react'
import Button from '../../components/Button'
import BackgroundGradient from '../../components/BackgroundGradient'
import FullscreenForm from '../../components/FullscreenForm'
import TextInput from '../../components/TextInput'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/auth/authActions'
import Alert from '../../components/Alert'

class Signup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: {}
    }
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
  };

  onSubmit = (e) => {
    e.preventDefault()

    const { username, email, password, passwordConfirm } = this.state

    const errors = {}

    if (!username) {
      errors.username = 'Please enter a username'
    }

    if (!email) {
      errors.email = 'Please enter an email'
    }

    if (!password) {
      errors.password = 'Please enter a password'
    }

    if (!passwordConfirm || passwordConfirm !== password) {
      errors.passwordConfirm = 'Passwords do not match'
    }

    this.setState((prevState) => ({
      ...prevState,
      errors
    }))

    if (Object.keys(errors).length > 0) {
      return
    }

    this.props.registerUser({
      username,
      email,
      password
    })
  };

  render () {
    const { errors } = this.state
    if (this.props.success) {
      setTimeout(() => this.props.history.push('/login'), 1000)
    }

    return (
      <BackgroundGradient>
        <FullscreenForm heading="SIGN UP">
          <Alert type="error" message={this.props.error} />
          <Alert type="success" message={this.props.success} />
          <TextInput
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.onChange}
            error={errors.username}
          />
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onChange}
            error={errors.email}
          />
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onChange}
            error={errors.password}
          />
          <TextInput
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            onChange={this.onChange}
            error={errors.passwordConfirm}
          />

          <Button size="fullwidth" color="primary" onClick={this.onSubmit}>
            Sign up
          </Button>
        </FullscreenForm>
      </BackgroundGradient>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.self,
  success: state.success.register,
  error: state.error.register
})

const mapDispatchToProps = (dispatch) => ({
  registerUser: (credentials) => dispatch(registerUser(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
