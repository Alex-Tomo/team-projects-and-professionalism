import React, { Component } from "react"
import { Link, Outlet } from "react-router-dom"
import ConButtons from "./conditional-buttons"
import LogButtons from "./login-logout-buttons"
import logo from "../../images/kip_logo.png"

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: false,
      showMenu: false
    }
  }

  componentDidMount() {
    if(localStorage.getItem('user')){
      this.setState({logged: true})
    }
  }

  showMenu = () => {

    this.setState({showMenu: !this.state.showMenu})


    
  }
  render() {
    let mobileNavElement = document.getElementById("nav-hamburger")
    let isLogged = this.state.logged
    if(mobileNavElement){
    if(this.state.showMenu === true){
      mobileNavElement.classList.add("is-active")
    }if(this.state.showMenu === false){
      mobileNavElement.classList.remove("is-active")
    }
  }
    return (
      <>
        <nav
          className="navbar is-white shaddow-nav"
          role="navigation"
          aria-label="main navigation"
          id="nav"
        >
          <div className="navbar-brand">
            <div className="brand-marg">
            <Link to="/"><img className="height"
                width="205"
                height="53"
                src={logo}
                alt="kip mcgrath navigation logo"
              />
              </Link>
            </div>
            <div
              role="button"
              id="nav-hamburger"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="true"
              data-target="navbarBasicExample"
              onClick={this.showMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div>
            {this.state.showMenu && !isLogged ? <ul className="has-text-centered mobile-nav-items fade-in">
              
              <li onClick={this.showMenu} className="mobile-nav-item">
              <Link className="navbar-item nav-text" to="/">
                Home
              </Link>
              </li>
              <li onClick={this.showMenu} className="mobile-nav-item">
              <a className="navbar-item nav-text" href="#about">
                About Us
              </a>
              </li>
              <li onClick={this.showMenu} className="mobile-nav-item">
              <a className="navbar-item nav-text" href="#support">
                Learning
              </a>
              </li>
              <li onClick={this.showMenu} className="mobile-nav-item">
              <Link className="navbar-item nav-text" to="/">
                Work With Us
              </Link>
              </li>
              <li onClick={this.showMenu}>
              <LogButtons />
              <br></br>
              </li>
            </ul>: this.state.showMenu && isLogged ? <div className="mobile-dash mobile-nav-items fade-in" onClick={this.showMenu}><ConButtons />
                  <div className="login-button-nav">
                  <LogButtons />
                  </div>
                  <br></br>
            </div>: null}

            </div>

          <div className="navbar-menu">
            {!isLogged ? (<div className="navbar-item center">
              <Link className="navbar-item nav-text" to="/">
                Home
              </Link>
              <a className="navbar-item nav-text" href="#about">
                About Us
              </a>
              <a className="navbar-item nav-text" href="#support">
                Learning
              </a>
              <a className="navbar-item nav-text" href="#contact">
                Work With Us
              </a>
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