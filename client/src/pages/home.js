import React, { Component } from "react"
import {Navigate} from 'react-router-dom';
import HomeDesktop from "../components/home/home-desktop";

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ""
    }
  }

  render() {
    if(localStorage.getItem("user")){
      let loggedIn = JSON.parse(localStorage.getItem("user"))
      switch(loggedIn.roles[0]){
        case 'ROLE_ADMIN':
          return <Navigate  to="/admin" />
        case 'ROLE_TUTOR':
          return <Navigate  to="/tutor" />
        case 'ROLE_USER':
          return <Navigate  to="/user" />
        default:
          console.warn("Failed to redirect. Contact administrator.")
          return <Navigate  to="/" />
      }
    }
    return (
    <div>
      <div className="mobile-ver">
        mobile-ver
      </div>

      <div className="desktop-ver">
      <HomeDesktop />
      </div>

      </div>
    )
  }
}