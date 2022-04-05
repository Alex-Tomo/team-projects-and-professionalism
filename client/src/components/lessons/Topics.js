import React from "react"
import { Link } from "react-router-dom"
import math_1 from './topic-images/math_1.jpg'
import english_1 from './topic-images/english_1.jpg'
import verbal_1 from './topic-images/verbal_1.jpg'
import non_verbal_1 from './topic-images/non_verbal_1.jpg'

class Topics extends React.Component {
    render() {
        const username = JSON.parse(localStorage.getItem('user')).username;
        return (
            <div>
                <div>
                    <section className="section is-medium sub-home-background">
                        <h1 className="dashboard heading">Welcome Back, {username}!</h1>
                        <h2 className="dashboard sub-heading">Practice these subjects</h2>
                        {/*<Link className="is-danger" to="/user">
                            <button className="button is-info" style={{ backgroundColor: "#00549F" }}>
                                Back to Dashboard
                            </button>
                        </Link>*/}
                    </section>
                </div>
                <div className="columns flex-grid">
                    <Link className="link" to="/math">
                        <div className="column grid-item">
                            <figure className="image is-4by3">
                                <img src={math_1} alt="Maths" />
                            </figure>
                            <h3>Maths</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </div>
                    </Link>

                    <Link className="link" to="/english">
                        <div className="column grid-item">
                            <figure className="image is-4by3">
                                <img src={english_1} alt="English" />
                            </figure>
                            <h3>English</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </div>
                    </Link>

                    <Link className="link" to="/verbal">
                        <div className="column grid-item">
                            <figure className="image is-4by3">
                                <img src={verbal_1} alt="Verbal" />
                            </figure>
                            <h3>Verbal Reasoning</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </div>
                    </Link>

                    <Link className="link" to="/nonverbal">
                        <div className="column grid-item">
                            <figure className="image is-4by3">
                                <img src={non_verbal_1} alt="Non-Verbal" />
                            </figure>
                            <h3>Non-Verbal Reasoning</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </div>
                    </Link>
                </div >
            </div >
        )
    }
}

export default Topics