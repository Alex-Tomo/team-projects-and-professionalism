import React, { Component } from "react"
import UserService from "../services/user.service"
import video from "../video/sleepyjoe.webm"
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
        <section className="hero is-large hero-background">
          <div className="hero-body level hero-image">
            <div className="container pad-right">
            <p className="title has-text-white hero-heading">Qualified Teachers With the Time and Skills.</p>
            <section className="mt-2 mb-4 hero-underscore"></section>
            <p className="subtitle has-text-white hero-sub">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
            <div><button className="button hero-button-sol mr-5">Our Solutions</button> <button className="button hero-button">Contacts</button></div>
            </div>
            <div className="container"></div>
          </div>
        </section>

        <section className="section is-medium sub-home-background">
          
        <div className="columns">
  <div className="column video-cont">      
  <video className="" width="500" height="268">
      <source src={video} type="video/webm"></source>
        </video>
        </div>
  <div className="column">              <p className="title live-head hero-heading">Kip McGrath provides live and interactive lessons online or in centre.</p>
            <section className="mt-2 mb-4 hero-underscore"></section>
            <p className="subtitle live-sub hero-sub">
            During these uncertain times, Kip McGrath is here to support your child's continued learning. Our qualified tutors ensure they receive the attention they need, in the areas they need it most. 
            </p>
            <div><button className="button hero-button-sol mr-5">Our Solutions</button></div>
                </div></div>
        </section>

        <section className="section is-large sub-home-background gray">
          <div className="">
            <p className="title">Kip McGrath Learning Platform</p>
            <p className="subtitle">
              Where we definately don't steal childrens data.
            </p>
          </div>
        </section>

        <section className="section is-large sub-home-background">
          <div className="">
            <p className="title">Kip McGrath Learning Platform</p>
            <p className="subtitle">
              Where we definately don't steal childrens data.
            </p>
          </div>
        </section>

        <section className="section is-large hero-background">
          <div className="">
            <p className="title has-text-white">Qualified Teachers With the Time and Skills</p>
            <p className="subtitle has-text-white">
              Where we definately don't steal childrens data.
            </p>
          </div>
        </section>

      </div>
    )
  }
}