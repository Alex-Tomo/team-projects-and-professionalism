import React, { Component } from "react"
import video from "../../video/sleepyjoe.webm"
import {Navigate} from 'react-router-dom';
import Check from '../../images/contact-check.svg'
import Pencil from '../../images/contact-pencil.svg'
import Cards from '../cards-mobile'
import Support from '../../images/contact-support.svg'
import Hat from '../../images/contact-hat.svg'
import Graham from '../../images/graham.png'

export default class HomeMobile extends Component {
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
        <section id="1" className="hero-background mobile-size">
          <img className="mobile-hero-image" src={require ("../../images/graham.png")} width="600rem" height="200rem" alt="graham" />
          <h1 className="mobile-hero-heading ml-5 mr-5">Qualified teachers with the time and the skills.</h1>
          <section className="mt-4 mb-4 pt-1 cards-underscore"></section>
          <p className="mobile-hero-sub ml-5 mr-5 mb-5">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
        </section>

        <section id="2" className="sub-home-background mobile-norm">
        <video className="video-player" width="400" height="268">
            <source src={video} type="video/webm"></source>
        </video>
        <h1 className="mobile-hero-heading about-mobile-heading ml-5 mr-5">Qualified teachers with the time and the skills.</h1>
          <section className="mt-4 mb-4 pt-1 cards-underscore"></section>
          <p className="mobile-hero-sub about-mobile-sub ml-5 mr-5">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
        </section>

        <section id="3" className="mobile-norm">
            <div className="mobile-support-div">
        <h1 className="mobile-hero-heading about-mobile-heading ml-5 mr-5">Qualified teachers with the time and the skills.</h1>
          <section className="mt-4 mb-4 pt-1 cards-underscore"></section>
          <p className="mobile-hero-sub about-mobile-sub ml-5 mr-5">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          </div>
          <br/>
          <Cards color='card-color-green' />
          <br/>
              <Cards color='card-color-purple' />
              <br/>
              <Cards color='card-color-red'/>
              <br/>
        </section>

        <section id="4" className="mobile-norm sub-home-background">
            <div className="mobile-support-div">
        <h1 className="mobile-hero-heading about-mobile-heading ml-10 mr-5">Qualified teachers with the time and the skills.</h1>
          <section className="mt-4 mb-4 pt-1 cards-underscore"></section>
          <p className="mobile-hero-sub about-mobile-sub ml-5 mr-5">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          </div>
<div className="card-position-mobile mb-5">
          <div className="contact-background">
          <div className="contact-icon"><img className="pt-5" src={Check} alt="checkmark" width="29px"/></div>
          <div className="contact-card-title">Weekly Sessions</div>
          <div className="contact-card-sub">We only produce high - quality products from aluminum and other metals.</div>
        </div>

        <div className="contact-background">
          <div className="contact-icon"><img className="pt-5" src={Pencil} alt="pencil" width="29px"/></div>
          <div className="contact-card-title">Personalised Programmes</div>
          <div className="contact-card-sub">Our ticket dispensers have a unique design that looks excellent in the exterior and interior.</div>
        </div>
        <div className="contact-background">
          <div className="contact-icon"><img className="pt-5" src={Support} alt="support life preserver" width="29px"/></div>
          <div className="contact-card-title">Technical Support</div>
          <div className="contact-card-sub">Akis Technologies provides technical support during the buying process and after it.</div>
        </div>
        <div className="contact-background">
          <div className="contact-icon"><img className="pt-5" src={Hat} alt="academic cap" width="29px"/></div>
          <div className="contact-card-title">Qualified teachers</div>
          <div className="contact-card-sub">We work in the queue management market for more than 30 years and build trust among clients. </div>
        </div>
        </div>
        </section>
        <div className="back-to-top-mob"><a className="back-to-top-color" href="#1">Back to Top</a></div>
      </div>
    )
  }
}