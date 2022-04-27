import React from 'react'
import Check from '../images/check.svg'

/**
 * All homepage cards and their layouts.
 * 
 * @author Jordan Short, W18039155
 */

export default class cards extends React.Component {
    render() {
        let cardHead = 'card-header card-size-head'
        cardHead += ` ${this.props.color}`;
        return (
            <div className="card card-size-home">
            <div className={cardHead}>
            </div>
            <div className="card-content card-content-home">
              <div className="content">
                <ul className="card-list-home">
                    <li><img src={Check} alt="checkmark" height="15px" width="15px" /> We tutor children from ages 6 - 16 years (R - 12)</li>
                    <br></br>
                    <li><img src={Check} alt="checkmark" height="15px" width="15px" /> We know that every child learns differently.</li>
                    <br></br>
                    <li><img src={Check} alt="checkmark" height="15px" width="15px" /> Every tutoring programme is personalised to suit.</li>
                </ul>
              </div>
              <div className='card-buttons-position'><button className="button kip-blue-background card-buttons">Find out More</button></div>
            </div>
          </div>
        )
    }
}