<<<<<<< HEAD
import React, { Component } from "react"
import Admin from "../components/Admin"
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
          <Admin />
        </header>
      </div>
    )
  }
}

=======
import React, { Component } from "react"
import Admin from "../components/Admin"
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
          <Admin />
        </header>
      </div>
    )
  }
}

>>>>>>> 765f8d850a3d348bf537100e686482219fb18127
export default BoardUser