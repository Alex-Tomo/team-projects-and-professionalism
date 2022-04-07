import React from "react"
import { Link } from "react-router-dom"
import math_1 from './topic-images/math_1.jpg'
import english_1 from './topic-images/english_1.jpg'
import verbal_1 from './topic-images/verbal_1.jpg'
import non_verbal_1 from './topic-images/non_verbal_1.jpg'

class TopicList extends React.Component {
    render() {
        const username = JSON.parse(localStorage.getItem('user')).username;
        return (
            <div>
                <div>
                    <section className="section is-medium sub-home-background">
                        <h1 className="dashboard heading">Welcome Back, {username}!</h1>
                        <h2 className="dashboard sub-heading">Practice these subjects</h2>
                    </section>
                </div>
                <div className="columns flex-grid mt-4">
                    <div className="column grid-item topic-hover">
                        <Link className="link" to="/math">
                            <figure className="image is-4by3">
                                <img className="topic-img" src={math_1} alt="Maths" />
                            </figure>
                            <h3 className="subtitle is-5 c mb-2 has-text-weight-semibold">Maths</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </Link>
                    </div>

                    <div className="column grid-item topic-hover">
                        <Link className="link" to="/english">
                            <figure className="image is-4by3">
                                <img className="topic-img" src={english_1} alt="English" />
                            </figure>
                            <h3 className="subtitle is-5 mt-1 mb-2 has-text-weight-semibold">English</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </Link>
                    </div>

                    <div className="column grid-item topic-hover">
                        <Link className="link" to="/verbal">
                            <figure className="image is-4by3">
                                <img className="topic-img" src={verbal_1} alt="Verbal" />
                            </figure>
                            <h3 className="subtitle is-5 mt-1 mb-2 has-text-weight-semibold">Verbal Reasoning</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </Link>
                    </div>

                    <div className="column grid-item topic-hover">
                        <Link className="link" to="/nonverbal">
                            <figure className="image is-4by3">
                                <img className="topic-img" src={non_verbal_1} alt="Non-Verbal" />
                            </figure>
                            <h3 className="subtitle is-5 mt-1 mb-2 has-text-weight-semibold">Non-Verbal Reasoning</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </Link>
                    </div>
                </div >
            </div >
        )
    }
}

export default TopicList