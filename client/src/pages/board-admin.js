import React, { Component } from "react"
import UserService from "../services/user.service"
import AuthService from "../services/auth.service"

class BoardUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ""
    }
  }
  logout() {
    AuthService.logout()
    window.location.href = "http://localhost:3000/"
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      (response) => {
        this.setState({
          content: response.data
        })
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        })
      }
    )
  }
  render() {
    return (
      <div>
        <header className="container has-text-centered">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    )
  }
}

export default BoardUser