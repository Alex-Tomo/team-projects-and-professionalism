import React from "react"
import axios from "axios"
import authHeader from "../../services/auth-header"
import { Link } from "react-router-dom";


// note for alex: => looked at


class LessonList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lessons: []
        }
    }

    componentDidMount() {
        this.checkLessonType()
    }

    checkLessonType = () => {
        axios.get('http://localhost:8080/api/lessons', {
            headers: authHeader(),
            params: {
                type: this.props.type
            }
        }).then(res => {
            this.setState({
                lessons: res.data
            })
        }).catch(e => {
            console.log("error: " + e)
        })
    }

    render() {
        let lesson = ""

        if (this.state.lessons.length > 0) {
            lesson = this.state.lessons.map((result, i) => {
                let questionsToArray = []
                questionsToArray = result.question_list.split(",")
                let arr = []
                for (let i = 0; i < questionsToArray.length; i++) {
                    arr.push(parseInt(questionsToArray[i]))
                }

                return (
                    <div key={i} className="box is-shadowless mb-4" style={{ border: "2px solid #F2F2F2", borderRadius: "8px" }}>
                        <div className="columns">
                            <div className="column is-3">
                                <figure className="image has-background-black is-16by9" />
                            </div>
                            <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                <h4 className="subtitle is-5 mb-0 has-text-weight-bold">{result.lesson_name}</h4>
                                <p>Additional information</p>
                            </div>
                            <div className="column is-1 is-pulled-right hide-mobile" style={{ margin: "auto", width: "10%", padding: "10px" }}>
                                <Link to="/questions" state={{ questionArray: arr, type: this.props.type, lessonId: result.lesson_id }}>
                                    <button className="button is-black ">
                                        Start
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div>
                <section className="section is-medium sub-home-background">
                    <h1 className="dashboard heading">
                        <div className="container">
                            <h1 className="title is-2 has-text-weight-bold">{this.props.title}</h1>
                            <p className="subtitle is-6" style={{ width: "30%", textTransform: "none" }}>
                                Increase productivity of customer service staff and improve your customer.
                                Increase productivity of customer service staff and improve your customer.
                            </p>
                            <Link className="is-danger" to="/user">
                                <button className="button is-info" style={{ backgroundColor: "#00549F" }}>
                                    Back to Dashboard
                                </button>
                            </Link>
                        </div>
                    </h1>
                </section>
                <div className="container mt-5">
                    {lesson}
                </div>
            </div>
        )
    }
}

export default LessonList