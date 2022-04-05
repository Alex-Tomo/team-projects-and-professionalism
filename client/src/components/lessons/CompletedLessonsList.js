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
            params: {
                userId: JSON.parse(localStorage.getItem('user')).id
            }
        }).then(res => {
            this.setState({
                completedLessons: res.data
            })
        }).catch(e => {
            console.log("error: " + e)
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
        let completedLesson = ""
        if (this.state.completedLessons.length > 0) {
            completedLesson = this.state.completedLessons.map((result, i) => {
                console.log(result);
                return (
                    <div key={i} className="box is-shadowless mb-4" style={{ border: "2px solid #F2F2F2", borderRadius: "8px" }}>
                        <div className="columns">
                            <div className="column is-3">
                                <figure className="image is-16by9">
                                    <img src={this.imageGenerator(result.lesson.lesson_type)} alt={result.lesson.lesson_type + " image"} />
                                </figure>
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
                    <h1 className="dashboard heading">Completed Tests</h1>
                    <h2 className="dashboard sub-heading mb-4"> Increase productivity of customer service staff and improve your customer.</h2>
                    <Link className="is-danger" style={{ marginLeft: "75px" }} to="/topics">
                        <button className="button is-info" style={{ backgroundColor: "#00549F" }}>
                            Back to Practice
                        </button>
                    </Link>

                </section>
                <div className="container mt-5">
                    {completedLesson}
                </div>
            </div>
        )
    }
}

export default CompletedLessonList