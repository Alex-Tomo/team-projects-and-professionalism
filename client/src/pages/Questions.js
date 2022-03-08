import React from "react";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";

class Test extends React.Component {
    render() {
        let testName = ""
        let testNum = 0

        if (window.location.href.indexOf("math") > -1) {
            testName = "Math Test "
            testNum = 1
        } else if (window.location.href.indexOf("english") > -1) {
            testName = "English Test "
            testNum = 2
        } else if (window.location.href.indexOf("nonverbal") > -1) {
            testName = "Non-Verbal Reasoning Test "
            testNum = 3
        } else {
            testName = "Verbal Reasoning Test "
            testNum = 4
        }

        return (

            <div className="box is-shadowless mb-4" style={{ border: "2px solid #F2F2F2", borderRadius: "8px" }}>
                <div className="columns">
                    <div className="column is-3">
                        <figure className="image has-background-black is-16by9" />
                    </div>
                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold">{testName}{testNum}</h4>
                        <p>Additional information</p>
                    </div>
                    <div className="column is-1 is-pulled-right hide-mobile" style={{ margin: "auto", width: "10%", padding: "10px" }}>
                        <Link className="" to="/mathquestions">
                            <button className="button is-black ">Start</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Test;