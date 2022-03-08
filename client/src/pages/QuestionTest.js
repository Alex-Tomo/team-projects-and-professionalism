import React from "react"
import UserService from "../services/user.service"
import axios from "axios";
import authHeader from "../services/auth-header";

class QuestionTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loggedIn: false
        }
    }

    componentDidMount() {
        UserService.getUserBoard()
            .then((response) => {
                this.setState({
                    content: response.data,
                    loggedIn: true
                })
            },
<<<<<<< HEAD
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
            ).then(() => {
                axios.get('http://localhost:8080/api/mathslesson', { headers: authHeader() })
                    .then(res => {
                        console.log(res)

                    }).catch(e => {
                        console.log("error: " + e)
                    })
            })
=======
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
        ).then(() => {
            axios.get('http://localhost:8080/api/mathslesson', { headers: authHeader() })
                .then(res => {
                    console.log(res)
                }).catch(e => {
                console.log("error: " + e)
            })
        })
>>>>>>> 765f8d850a3d348bf537100e686482219fb18127
    }

    render() {
        let title = "not logged in"

        if (this.state.loggedIn) {
            title = "logged in"
        }

        return (
            <div>
                <h1>{title}</h1>
            </div>
        )
    }
}

export default QuestionTest