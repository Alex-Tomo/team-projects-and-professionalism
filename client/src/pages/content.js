import React, { Component } from "react"

import AuthService from "../services/auth-header"
import UserService from "../services/user.service"


import Questions from "../components/content/Questions"
import Lessons from "../components/content/Lessons/Lessons"

import "../css/content.css"

class Content extends Component{ 
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      page: 1,
      search: "",
      content: <Questions/>,
      contentName: "Questions",
    }

    //this.handleSearch = this.handleSearch.bind(this)
  }

  logout() {
    AuthService.logout()
    window.location.href = "http://localhost:3000/"
}


  Questions = (e) => {
    this.setState({
      content: <Questions/>,
      contentName: "Questions",
    }) 
  }
  Lessons = (e) => {
    this.setState({
      content: <Lessons/>,
      contentName: "Lessons",
    }) 
  }
    render(){
      return(
      <>
        <div>
        <section className="info-box">
          <div className="info-body">
              <h1 className="account-management-title title">Content Management</h1>
            <p className="subtitle">
              Add, remove and edit student questions.
            </p>
            <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                        <button className="button is-normal" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>{this.state.contentName}</span>
                        
                        <span className="icon is-small">
                             <i className="fas fa-angle-down" aria-hidden="true"></i>
                         </span>
                        </button>
                    </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">  

                          <div className="dropdown-content">
                            <button  style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable has-text-centered " onClick = {this.Questions}>Questions</button>
                            <button  style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable has-text-centered" onClick = {this.Lessons}>Lessons</button>
                          </div>
                        
                        </div>
                    </div>
                </div>
          </div>
          
          
        
          
          
        </section>
      </div>
      <div>
        
      <section className="content-box">
        <div className="content-body">
              {this.state.content}
          </div>
      </section>
    </div>
    </>
      )
    }   
  }

export default Content