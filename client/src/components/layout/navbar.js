import React, { Component } from "react"
import { Link, Outlet } from "react-router-dom"
import ConButtons from "./conditional-buttons"
import LogButtons from "./login-logout-buttons"
import logo from "../../images/kip_logo.png"

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: false
    }
  }

  componentDidMount() {
    if(localStorage.getItem('user')){
      this.setState({logged: true})
    }
  }
  render() {
    let isLogged = this.state.logged
    return (
      <>
        <nav
          className="navbar is-white shaddow-nav"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="brand-marg">
              <img className="height"
                width="205"
                height="53"
                src={logo}
                alt="kip mcgrath navigation logo"
              />
            </div>
            <div
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            {!isLogged ? (<div className="navbar-item center">
              <Link className="navbar-item nav-text" to="/">
                Home
              </Link>
              <Link className="navbar-item nav-text" to="/">
                About Us
              </Link>
              <Link className="navbar-item nav-text" to="/">
                Support
              </Link>
              <Link className="navbar-item nav-text" to="/">
                Contact Us
              </Link>
            </div>) : (<ConButtons />)}

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <LogButtons />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Outlet />
      </>
    )
  }
}
export default NavBar