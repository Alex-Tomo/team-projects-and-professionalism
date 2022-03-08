<<<<<<< HEAD
import React, { Component } from "react"
import UserService from "../services/user.service"
import AuthService from "../services/auth.service"

class BoardTutor extends Component {
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
    UserService.getTutorBoard().then(
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

=======
import React, { Component } from "react"
import UserService from "../services/user.service"
import AuthService from "../services/auth.service"

class BoardTutor extends Component {
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
    UserService.getTutorBoard().then(
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

>>>>>>> 765f8d850a3d348bf537100e686482219fb18127
export default BoardTutor