import React, { Component } from "react"
import UserService from "../services/user.service"
import AuthService from "../services/auth.service"
import StudentStatistics from "../components/statistics/StudentStatistics";

class BoardUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ""
        }
    }
    logout() {
        AuthService.logout()
        window.location.href = "http://localhost:3000/"
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            (response) => {
                this.setState({
                    content: response.data
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
        const username = JSON.parse(localStorage.getItem('user')).username;
        return (
            <div>
                <section className="section is-medium sub-home-background">
                    <h1 className="dashboard heading">Welcome Back, {username}!</h1>
                    <h2 className="dashboard sub-heading">Continue learning and enjoy it!</h2>
                </section>
                <StudentStatistics />
            </div>
        )
    }
}

export default BoardUser