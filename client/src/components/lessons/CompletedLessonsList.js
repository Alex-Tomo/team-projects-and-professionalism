import React from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import authHeader from "../../services/auth-header"
import UserService from "../../services/user.service";

/**
 * Displays a list of the user's completed lessons
 *
 * @author Graham Stoves
 */

class CompletedLessonList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loggedIn: false,
            completedLessons: []
        }
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            (response) => {
                this.setState({
                    content: response.data,
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
        ).then(() => {
            this.checkLessonType()
        })
    }

    checkLessonType = () => {
        axios.get('https://kip-learning.herokuapp.com/api/completedlessons', {
            headers: authHeader(),
            params: {
                userId: JSON.parse(localStorage.getItem('user')).id
            }
        }).then(res => {
            this.setState({
                completedLessons: res.data
            })
        }).catch(error => {
            this.setState({
                content:
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
            })
        })
    }

    importAll = (r) => {
        let images = {}
        r.keys().forEach((item, index) => {
            images[item.replace('./', '')] = r(item)
        })
        return images
    }

    imageGenerator = (imageType) => {
        const images = this.importAll(require.context('./topic-images', false, /\.(jpg)$/))
        let number = Math.floor(Math.random() * 2) + 1
        switch (imageType) {
            case "math":
                return images["math_" + number + ".jpg"]
            case "english":
                return images["english_" + number + ".jpg"]
            case "verbal_reasoning":
                return images["verbal_" + number + ".jpg"]
            case "non_verbal_reasoning":
                return images["non_verbal_" + number + ".jpg"]
            default:
                break
        }
    }

    render() {
        let noTests = ""

        if (!this.state.loggedIn) {
            return (
                <div>You need to be logged in to see this page</div>
            )
        }

        if (this.state.completedLessons.length <= 0) {
            noTests = (
                <div>
                    <div style={{ textAlign: "center", marginTop: "90px" }}>
                        <div className="box is-shadowless">
                            < div className="columns">
                                <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                    <h4 className="title is-2 mb-3 has-text-weight-bold">You haven't completed any tests yet.</h4>
                                </div>
                            </div>
                            <div>
                                <Link className="is-danger" to="/topics">
                                    <button className="title is-4 button is-info mb-6" style={{ backgroundColor: "#00549F" }}>Topics</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        let completedLesson = ""
        if (this.state.completedLessons.length > 0) {
            completedLesson = this.state.completedLessons.map((result, i) => {
                return (
                    <div key={i} className="box is-shadowless mb-4 lesson-container">
                        <div className="columns">
                            <div className="column is-3 lesson-image-container">
                                <figure className="image is-16by9">
                                    <img className="lesson-list-img" src={this.imageGenerator(result.lesson.lesson_type)} alt={result.lesson.lesson_type + " image"} />
                                </figure>
                            </div>
                            <div style={{ display: "contents" }}>
                                <div className="column is-pulled-left lesson-name-container">
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Lesson Name: </h4>
                                    <h4 className="subtitle is-5 mb-0">{result.lesson.lesson_name}</h4>
                                </div>
                                <div className="buttons-container">
                                    <div className="column is-1 is-pulled-right lesson-list-buttons">
                                        <Link to="/completedlesson" state={{ lessonId: result.lesson_id, answers: result.answers, score: result.user_score, potentialScore: result.possible_score }}>
                                            <button className="button is-black ">
                                                View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mobile-buttons-container" style={{ display: "none" }}>
                                    <Link to="/completedlesson" state={{ lessonId: result.lesson_id, answers: result.answers, score: result.user_score, potentialScore: result.possible_score }}>
                                        <button className="button is-black ">
                                            View
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div>
                <section className="section is-medium sub-home-background" style={{ padding: "90px" }}>
                    <h1 className="dashboard heading">Completed Tests</h1>
                    <h2 className="dashboard sub-heading mb-4">View your completed tests.</h2>
                    <Link className="is-danger" style={{ marginLeft: "75px" }} to="/topics">
                        <button className="button is-info" style={{ backgroundColor: "#00549F" }}>Back to Practice</button>
                    </Link>
                </section>
                <div>{noTests}</div>
                <div className="container mt-5 lesson-list-container">{completedLesson}</div>
            </div>
        )
    }
}

export default CompletedLessonList