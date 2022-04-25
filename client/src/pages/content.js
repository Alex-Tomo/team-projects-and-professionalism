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


componentDidMount() {
  UserService.getUserBoard()
      .then((response) => {
          this.setState({
              content: response.data,
              loggedIn: true
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

      if (!this.state.loggedIn) {
        return (
            <div>
                <h1>You need to be logged in to access this page.</h1>
            </div>
        )
    }
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