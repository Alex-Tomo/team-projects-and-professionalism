import React from "react"
import { Link } from "react-router-dom"

class Topics extends React.Component {
    render() {
        return (
            <div>
                <div className="top">
                    <h1 className="title is-2 has-text-weight-bold">Welcome back, Student!</h1>
                    <p className="subtitle">Continue learning and enjoy it!</p>
                    <h2 className="subtitle">Tests we provide</h2>
                    <hr />
                    <br />
                </div>
                <div className="columns">
                    <Link className="" to="/english">
                        <div className="column" id="topic">
                            <figure className="image is-4by3" />
                            <h3>English</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </div>
                    </Link>

                    <Link className="" to="/math">
                        <div className="column" id="topic">
                            <figure className="image is-4by3" />
                            <h3>Maths</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </div>
                    </Link>

                    <Link className="" to="/verbal">
                        <div className="column" id="topic">
                            <figure className="image is-4by3" />
                            <h3>Verbal Reasoning</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </div>
                    </Link>

                    <Link className="" to="/nonverbal">
                        <div className="column" id="topic">
                            <figure className="image is-4by3" />
                            <h3>Non-Verbal Reasoning</h3>
                            <p>Increase productivity of customer service staff and improve your customer.</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Topics