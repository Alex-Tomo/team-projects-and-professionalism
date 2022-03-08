<<<<<<< HEAD
import React, { Component } from "react"
import { Link, Outlet } from "react-router-dom"
import ConButtons from "./conditional-buttons"
import LogButtons from "./login-logout-buttons"

class NavBar extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar is-light"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-item">
              <img
                width="112"
                height="28"
                src="https://www.kipmcgrath.co.uk/svg/logo-horizontal-blue-7e1bed4723.svg"
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
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Home
              </Link>
              <ConButtons route="/admin" name="Admin" />
            </div>

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
=======
import React, { Component } from "react"
import { Link, Outlet } from "react-router-dom"
import ConButtons from "./conditional-buttons"
import LogButtons from "./login-logout-buttons"

class NavBar extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar is-light"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-item">
              <img
                width="112"
                height="28"
                src="https://www.kipmcgrath.co.uk/svg/logo-horizontal-blue-7e1bed4723.svg"
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
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Home
              </Link>
              <ConButtons route="/admin" name="Admin" />
            </div>

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
>>>>>>> 765f8d850a3d348bf537100e686482219fb18127
export default NavBar