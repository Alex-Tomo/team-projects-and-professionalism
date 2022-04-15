import React from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import authHeader from "../../services/auth-header"
import UserService from "../../services/user.service";

/**
 * Displays a list of the user's lessons
 *
 * @author Graham Stoves
 */

class LessonList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loggedIn: false,
            lessons: []
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
        axios.get('https://kip-learning.herokuapp.com/api/lessons', {
            headers: authHeader(),
            params: {
                type: this.props.type
            }
        }).then(res => {
            this.setState({
                lessons: res.data
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

    imageGenerator = () => {
        const images = this.importAll(require.context('./topic-images', false, /\.(jpg)$/))
        let number = Math.floor(Math.random() * 2) + 1
        switch (this.props.type) {
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
        let lesson = ""
        let noLessons = ""

        if (!this.state.loggedIn) {
            return (
                <div>You need to be logged in to see this page</div>
            )
        }

        if (this.state.lessons.length <= 0) {
            noLessons = (
                <div>
                    <div style={{ textAlign: "center", marginTop: "90px" }}>
                        <div className="box is-shadowless">
                            < div className="columns">
                                <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                    <h4 className="title is-2 mb-3 has-text-weight-bold">You have no lessons to complete.</h4>
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

        if (this.state.lessons.length > 0) {
            lesson = this.state.lessons.map((result, i) => {
                let questionsToArray = []
                questionsToArray = result.question_list.split(",")
                let questionList = []
                for (let i = 0; i < questionsToArray.length; i++) {
                    questionList.push(parseInt(questionsToArray[i]))
                }

                return (
                    <div key={i} className="box is-shadowless mb-4 lesson-container" style={{ marginBottom: "100px" }}>
                        <div className="columns">
                            <div className="column is-3 lesson-image-container">
                                <figure className="image is-16by9">
                                    <img className="lesson-list-img" src={this.imageGenerator()} alt="English" />
                                </figure>
                            </div>
                            <div style={{ display: "contents" }}>
                                <div className="column is-pulled-left lesson-name-container">
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Lesson Name: </h4>
                                    <h4 className="subtitle is-5 mb-0">{result.lesson_name}</h4>
                                </div>
                                <div className="buttons-container">
                                    <div className="column is-1 is-pulled-right lesson-list-buttons">
                                        <Link to="/questions" state={{ questionArray: questionList, type: this.props.type, lessonId: result.lesson_id, lessonName: result.lesson_name }}>
                                            <button className="button is-info mb-3" style={{ backgroundColor: "rgb(0, 84, 159)" }}>Start</button>
                                        </Link>
                                        <Link to="/viewlesson" state={{ lessonId: result.lesson_id, answers: result.answers, score: result.user_score, potentialScore: result.possible_score }}>
                                            <button className="button is-black">View</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mobile-buttons-container" style={{ display: "none" }}>
                                    <Link to="/questions" state={{ questionArray: questionList, type: this.props.type, lesson_id: result.lesson_id, lesson_name: result.lesson_name }}>
                                        <button className="button is-info mr-5" style={{ backgroundColor: "rgb(0, 84, 159)" }}>Start</button>
                                    </Link>
                                    <Link to="/viewlesson" state={{ lessonId: result.lessonId, answers: result.answers, score: result.user_score, potentialScore: result.possible_score }}>
                                        <button className="button is-black ">View</button>
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
                    <h1 className="dashboard heading">{this.props.title}</h1>
                    <h2 className="dashboard sub-heading mb-4">Practice these tests.</h2>
                    <Link className="is-danger" style={{ marginLeft: "75px" }} to="/topics">
                        <button className="button is-info" style={{ backgroundColor: "#00549F" }}>
                            Back to Practice
                        </button>
                    </Link>
                </section>
                <div>
                    {noLessons}
                </div>
                <div className="container mt-5 lesson-list-container">
                    {lesson}
                </div>
            </div>
        )
    }
}

export default LessonList