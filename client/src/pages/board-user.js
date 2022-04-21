import React, { Component } from "react"
import UserService from "../services/user.service"
import AuthService from "../services/auth.service"
import StudentStatistics from "../components/statistics/StudentStatistics";

class BoardUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loggedIn: false,
            username: ""
        }
    }

    logout() {
        AuthService.logout()
        window.location.href = "http://localhost:3000"
    }

    componentDidMount() {
        if(localStorage.getItem('user')){
        this.setState({
            username: JSON.parse(localStorage.getItem('user')).username
        })}

        UserService.getUserBoard().then(
            (response) => {
                this.setState({
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

    render() {
        if (!this.state.loggedIn) {
            return (
                <div>You need to be logged in to see this page</div>
            )
        }

        const username = this.state.username
        return (
            <div>
                <section className="section is-medium sub-home-background">
                    <h1 className="dashboard heading">Welcome Back, {username}!</h1>
                    <h2 className="dashboard sub-heading">The students dashboard.</h2>
                </section>
                <StudentStatistics />
            </div>
        )
    }
}

export default BoardUser