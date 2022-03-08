import React from "react";
import { Link } from "react-router-dom";

class PageTitle extends React.Component {
    render() {
        let title = ""
        let description = ""

        if (window.location.href.indexOf("math") > -1) {
            title = "Math Tests"
            description = "Increase productivity of customer service staff and improve your customer. Increase productivity of customer service staff and improve your customer."
        } else if (window.location.href.indexOf("english") > -1) {
            title = "English Tests"
            description = "Increase productivity of customer service staff and improve your customer. Increase productivity of customer service staff and improve your customer."
        } else if (window.location.href.indexOf("nonverbal") > -1) {
            title = "Non-Verbal Reasoning Tests"
            description = "Increase productivity of customer service staff and improve your customer. Increase productivity of customer service staff and improve your customer."
        } else {
            title = "Verbal Reasoning Tests"
            description = "Increase productivity of customer service staff and improve your customer. Increase productivity of customer service staff and improve your customer."
        }

        return (
            <div className="container">
                <h1 className="title is-2 has-text-weight-bold">{title}</h1>
                <p className="subtitle is-6">{description}</p>
                <Link className="is-danger" to="/user">
                    <button className="button is-normal">Back to Dashboard</button>
                </Link>
                <hr />
                <br />
                <h2 className="subtitle has-text-weight-bold is-3 mb-1">Questions</h2>
                <hr className="line" />
            </div >
        )
    }
}

export default PageTitle;