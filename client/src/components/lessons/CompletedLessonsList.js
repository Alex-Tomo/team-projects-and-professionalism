import React from "react"
import axios from "axios"
import authHeader from "../../services/auth-header"
import { Link } from "react-router-dom";

class CompletedLessonList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            completedLessons: []
        }
    }

    componentDidMount() {
        this.checkLessonType()
    }

    checkLessonType = () => {
        axios.get('http://localhost:8080/api/completedlessons', {
            headers: authHeader(),
        }).then(res => {
            this.setState({
                completedLessons: res.data
            })
        }).catch(e => {
            console.log("error: " + e)
        })
    }

    render() {
        let completedLesson = ""
        if (this.state.completedLessons.length > 0) {
            completedLesson = this.state.completedLessons.map((result, i) => {
                return (
                    <div key={i} className="box is-shadowless mb-4" style={{ border: "2px solid #F2F2F2", borderRadius: "8px" }}>
                        <div className="columns">
                            <div className="column is-3">
                                <figure className="image has-background-black is-16by9" />
                            </div>
                            <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                <h4 className="subtitle is-5 mb-0 has-text-weight-bold">{result.lesson.lesson_name}</h4>
                                <p>Additional information</p>
                            </div>
                            <div className="column is-1 is-pulled-right hide-mobile" style={{ margin: "auto", width: "10%", padding: "10px" }}>
                                <Link to="/completedlesson" state={{ lessonId: result.lesson_id, answers: result.answers, score: result.user_score, potentialScore: result.possible_score }}>
                                    <button className="button is-black ">
                                        View
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
                            <h1 className="title is-2 has-text-weight-bold">Completed Tests</h1>
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
                    {completedLesson}
                </div>
            </div>
        )
    }
}

export default CompletedLessonList

//if (this.state.completed) {
//    axios.post('http://localhost:8080/api/userlessons', {
//        lessonId: this.props.lessonId,
//        userId: JSON.parse(localStorage.getItem('user')).id,
//        completed: this.state.completed,
//        userScore: this.state.score,
//        possibleScore: this.state.totalNumber
//    },
//        {
//            headers: authHeader()
//        }).then((result) => {
//            console.log(result)
//        }).catch(e => {
//            console.log(e)
//        })

//    return (
//        <div>
//            <p>Added</p>
//        </div>
//    )
//}
//    let percent = this.state.score / this.state.totalNumber * 100
//    let totalPercent = percent.toFixed(0)

//    return (
//        <div className="has-text-centered">
//            <div>
//                <h1 className="title">Your total is: {totalPercent}%</h1>
//                <br />
//                <h1 className="title">Your score is: {this.state.score} out of {this.state.totalNumber}. Good job!</h1>
//            </div>
//            <div>
//                <h2 className="subtitle is-4 mt-4 mb-1">Your answers:</h2>
//                {this.state.finalAnswer.map((ind) =>
//                    //this.state.questionList.map((index) =>
//                    <div>
//                        {/*<h3 className="subtitle is-5">{index.question}</h3>*/}
//                        <h3 className="subtitle is-5 mt-1" style={{}}>{ind}</h3>
//                    </div>
//                )}
//            </div>
//            <Link className="is-danger mt-5" to="/user">
//                <button className="button is-link">Back to Dashboard</button>
//            </Link>
//        </div>
//    )
//}