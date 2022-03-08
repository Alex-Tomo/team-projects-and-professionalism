import React, { Component } from "react"
import UserService from "../services/user.service"
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ""
    }
  }
  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data
        })
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        })
      }
    )
  }
  render() {
    return (
      <div>
        <section className="hero is-large is-info">
          <div className="hero-body">
            <p className="title">Kip McGrath Learning Platform</p>
            <p className="subtitle">
              Where we definately don't steal childrens data.
            </p>
          </div>
        </section>
      </div>
    )
  }
}