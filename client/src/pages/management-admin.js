import React, { Component } from "react"
import Admin from "../components/admin/Admin"
import UserService from "../services/user.service"
import AuthService from "../services/auth.service"

class ManagementAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ""
        }
    }
    logout() {
        AuthService.logout()
        window.location.href = "http://localhost:3000"
    }

    componentDidMount() {
        UserService.getTutorBoard().then(
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
        return (
            <div>
                <Admin />
            </div>
        )
    }
}

export default ManagementAdmin