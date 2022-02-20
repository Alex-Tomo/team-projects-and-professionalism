import React, { Component } from "react"
import AuthService from "../services/auth.service"
import { useNavigate } from "react-router-dom"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleLogin(e) {
    e.preventDefault()
    this.setState({
      message: "",
      loading: true
    })
    AuthService.login(this.state.username, this.state.password).then(
      () => {
        const userRole = AuthService.getCurrentUser().roles[0]
        let roleservice =
          userRole === "ROLE_ADMIN"
            ? (this.props.navigate("/admin"), window.location.reload())
            : userRole === "ROLE_USER"
            ? (this.props.navigate("/user"), window.location.reload())
            : userRole === "ROLE_TUTOR"
            ? (this.props.navigate("/tutor"), window.location.reload())
            : this.props.navigate("/404")
        return roleservice
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        this.setState({
          loading: false,
          message: resMessage
        })
      }
    )
  }
  render() {
    return (
      <div className="container is-max-desktop centerall login-box-size">
        <form
          onSubmit={this.handleLogin}
          ref={(c) => {
            this.form = c
          }}
          className="box"
        >
          <h1 className="is-size-4 has-text-centered has-text-weight-medium">
            Login
          </h1>
          {this.state.message && (
            <div>
              <div role="alert">{this.state.message}</div>
            </div>
          )}
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>
          </div>

          <button className="button is-info">Sign in</button>
        </form>
      </div>
    )
  }
}

function WithNavigate(props) {
  let navigate = useNavigate()
  return <Login {...props} navigate={navigate} />
}
export default WithNavigate
