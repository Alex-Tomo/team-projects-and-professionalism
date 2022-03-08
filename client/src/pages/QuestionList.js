import React from "react";
import PageTitle from "../components/PageTitle";
import Test from "./Questions";
import { Link } from "react-router-dom";

class QuestionList extends React.Component {
    render() {

        let pageContent = ""
        let pageContent2 = ""

        if (localStorage.getItem("user")) {
            pageContent = (
                <div>
                    <div className="top">
                        <PageTitle />
                    </div>
                </div>
            )
            pageContent2 = (
                <div>
                    <Test />
                </div >
            )
        } else {
            window.location.replace("http://localhost:3000/login")
        }

        return (
            <div>
                {pageContent}
                <div className="container">
                    {pageContent2}
                    {pageContent2}
                    {pageContent2}
                    {pageContent2}
                    {pageContent2}
                </div>
            </div >
        )
    }
}

export default QuestionList;