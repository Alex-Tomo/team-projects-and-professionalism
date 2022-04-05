import React, { Component } from "react"
import video from "../../video/sleepyjoe.webm"
import {Navigate} from 'react-router-dom';
import Cards from '../cards'
import Check from '../../images/contact-check.svg'
import Pencil from '../../images/contact-pencil.svg'
import Support from '../../images/contact-support.svg'
import Hat from '../../images/contact-hat.svg'

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
        <section id="home" className="hero is-large hero-background">
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

        <section id="about" className="section is-medium sub-home-background full-screen-height">
          
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

        <section id="support" className="section is-large sub-home-background gray support-overall">
          <div className="heading-support-home">
          <p className="title live-head hero-heading">Our most popular tests</p>
          <section className="mt-2 mb-4 cards-underscore"></section>
          <p className="subtitle live-sub hero-sub cards-sub">
          Easy way to manage all processes at the same time. Many end-to-end business processes require human interactions with the process.  
          </p>
          <br></br>
          </div>
            <div className="cards-home-align">
              <Cards color='card-color-green' />
              <Cards color='card-color-purple' />
              <Cards color='card-color-red'/>
            </div>
        </section>

        <section id="contact" className="section is-medium sub-home-background full-screen-height">
          
        <div className="columns">
        <div className="column"><p className="title live-head hero-heading contact-align">This is why students choose to work with us!</p>
            <section className="mt-2 mb-4 hero-underscore"></section>
            <p className="subtitle live-sub hero-sub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel scelerisque quis pellentesque sed diam venenatis. In id pretium, eget fermentum eget lectus ullamcorper. 
            </p>
            <div><button className="button hero-button-sol mr-5">Our Solutions</button></div>
                </div>

  <div className="column wrapper">      
        <div className="contact-background">
          <div className="contact-icon"><img src={Check} alt="checkmark" width="29px"/></div>
          <div className="contact-card-title">Weekly Sessions</div>
          <div className="contact-card-sub">We only produce high - quality products from aluminum and other metals.</div>
        </div>
        <div className="contact-background">
          <div className="contact-icon"><img src={Pencil} alt="pencil" width="29px"/></div>
          <div className="contact-card-title">Personalised Programmes</div>
          <div className="contact-card-sub">Our ticket dispensers have a unique design that looks excellent in the exterior and interior.</div>
        </div>
        <div className="contact-background">
          <div className="contact-icon"><img src={Support} alt="support life preserver" width="29px"/></div>
          <div className="contact-card-title">Technical Support</div>
          <div className="contact-card-sub">Akis Technologies provides technical support during the buying process and after it.</div>
        </div>
        <div className="contact-background">
          <div className="contact-icon"><img src={Hat} alt="academic cap" width="29px"/></div>
          <div className="contact-card-title">Qualified teachers</div>
          <div className="contact-card-sub">We work in the queue management market for more than 30 years and build trust among clients. </div>
        </div>
        </div>
</div>
        </section>
        <div className="back-to-top"><a href="#nav">Back to Top</a></div>
      </div>
    )
  }
}