import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import ReactToPrint from "react-to-print"
import UserService from "../../services/user.service"
import authHeader from "../../services/auth-header"

/**
 * Displays all the information from the user's completed lesson when 
 * they click on view, and they can download it to PDF
 *
 * @author Graham Stoves
 */

class SaveLessonToPdf extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loggedIn: false,
            lessons: [],
            questionList: [],
            lessonType: "",
            questionValue: [],
            answersArray: [],
            currentIndex: 0
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
                this.getLesson()
            })
    }

    getLesson = async () => {
        await axios.get('https://kip-learning.herokuapp.com/api/lessons', {
            headers: authHeader(),
            params: {
                lesson_id: this.props.lessonId
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

        this.state.lessons.map((result, i) => {
            <div key={i}></div>
            this.setState({
                questionValue: result.question_list,
                lessonType: result.lesson_type
            })
            return <></>
        })
        this.getQuestions().then(() => {
            this.setState({ currentIndex: 0 })
        })
    }

    getQuestions = async () => {
        if (this.state.questionValue.length > 0) {
            let questionArray = []
            let url = ""

            questionArray = this.state.questionValue.split(',').map(function (item) {
                return parseInt(item)
            })

            switch (this.state.lessonType) {
                case "math":
                    url = "https://kip-learning.herokuapp.com/api/mathslesson"
                    break
                case "english":
                    url = "https://kip-learning.herokuapp.com/api/englishlesson"
                    break
                case "verbal_reasoning":
                    url = "https://kip-learning.herokuapp.com/api/verballesson"
                    break
                case "non_verbal_reasoning":
                    url = "https://kip-learning.herokuapp.com/api/nonverballesson"
                    break
                default:
                    break
            }

            await axios.get(url, {
                headers: authHeader(),
                params: { questionList: questionArray }
            })
                .then(res => {
                    let questionDetails = []
                    for (let i = 0; i < questionArray.length; i++) {
                        for (let j = 0; j < questionArray.length; j++) {
                            if (res.data[j].question_id === questionArray[i]) {
                                questionDetails.push(res.data[j])
                            }
                        }
                    }
                    this.setState({
                        questionList: questionDetails,
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
    }

    importAll = (r) => {
        let images = {}
        r.keys().forEach((item, index) => {
            images[item.replace('./', '')] = r(item)
        })
        return images
    }

    render() {
        const reactStringReplace = require('react-string-replace')
        const images = this.importAll(require.context('./nonverbalreasoningimages', false, /\.(svg)$/))
        let lesson = ""
        let lessonName = ""
        let questionNumber = 0

        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>You need to be logged in to access this page.</h1>
                </div>
            )
        }

        if (this.state.lessonType == "math" || this.state.lessonType == "verbal_reasoning") {
            lesson = this.state.lessons.map((res, i) => {
                lessonName = res.lesson_name
                return (
                    <div key={i} style={{ marginLeft: "40px" }}>
                        <div className="box is-shadowless">
                            <div className="columns">
                                <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                </div>
                            </div><br />
                            <div className="print-container" style={{ margin: "0", padding: "0" }}>{
                                this.state.questionList.map((result, i) => {
                                    let question = result.question

                                    if (result.question.includes("{?}")) {
                                        questionNumber++
                                        question = (
                                            <div key={i} className="pb-0">
                                                {reactStringReplace(result.question, '{?}', (match, i) => {
                                                    return (
                                                        <input
                                                            style={{ width: "100px", color: "white" }}
                                                            className="input is-info mb-3"
                                                            type="number"
                                                        />
                                                    )
                                                })}
                                            </div>)
                                    } else {
                                        let questionString = result.question
                                        let array = questionString.split("\n")
                                        let subArray = []

                                        for (let i = 0; i < array.length; i++) {
                                            subArray.push(array[i].split(" "))
                                        }
                                        questionNumber++

                                        question = (
                                            subArray.map((arr, i) => {
                                                return (
                                                    <div key={i} style={{ display: "flex", marginBottom: "15px", width: "500px" }}>
                                                        <p>{i + 1})</p>
                                                        {
                                                            arr.map((number, j) => {
                                                                return (
                                                                    <button
                                                                        style={{ marginRight: "15px" }}
                                                                        key={j}
                                                                        className="button mb-3"
                                                                        id={`${i}.${j}`}
                                                                    >{number}
                                                                    </button>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }))
                                    }

                                    return (
                                        <div>
                                            <pre
                                                className="pb-6"
                                                id="question-container"
                                            >
                                                <h3 className="subtitle is-6 has-text-weight-bold mb-2">Question {questionNumber})</h3>
                                                {result.statement}
                                                {result.example}
                                                {question}
                                            </pre>
                                        </div >
                                    )
                                })
                            }
                            </div >
                        </div >
                    </div >
                )
            })
        }

        if (this.state.lessonType == "english") {
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    lessonName = res.lesson_name
                    return (
                        <div key={i} style={{ marginLeft: "40px" }}>
                            <div className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div><br />
                                <div>
                                    <h4 className="subtitle is-5 mt-5 mb-0 has-text-weight-bold is-underlined">{this.state.questionList[i].english_story.title}</h4>
                                    <pre className="pl-0" style={{ width: "1000px", whiteSpace: "pre-wrap" }}>{this.state.questionList[i].english_story.story}</pre>
                                </div >
                                <div>{
                                    this.state.questionList.map((result, x) => {
                                        questionNumber++
                                        let question = result.question
                                        return (
                                            <div key={x}>
                                                <pre
                                                    id="question-container"
                                                    className="pb-5"
                                                    style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                                >
                                                    <h3 className="subtitle is-6 has-text-weight-bold mb-2">Question {questionNumber})</h3>
                                                    {question}
                                                    <div>
                                                        <textarea className="mt-2" rows="3" cols="90" style={{ resize: "none" }}></textarea>
                                                    </div>
                                                </pre>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div >
                    )
                })
            }
        }

        if (this.state.lessonType == "non_verbal_reasoning") {
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    lessonName = res.lesson_name
                    return (
                        <div key={i} style={{ marginLeft: "40px" }}>
                            <div className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div >
                                <div>{
                                    this.state.questionList.map((result, x) => {
                                        questionNumber++
                                        return (
                                            <div key={x}>
                                                <h3 className="subtitle is-6 has-text-weight-bold mb-2">Question {questionNumber})</h3>
                                                <img className="non-verbal-image" src={images[result.filename]} alt="Non-Verbal" />
                                                <div>
                                                    <textarea className="mb-5 mt-1" rows="3" cols="7" style={{ resize: "none" }}></textarea>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        }

        return (
            <div ref={(response) => (this.componentRef = response)}>
                {lesson}
                <div style={{ textAlign: "center", marginBottom: "100px" }}>
                    <ReactToPrint
                        documentTitle={lessonName}
                        content={() => this.componentRef}
                        trigger={() =>
                            <div className="hide-button">
                                <button className="button is-outline mb-3 ">Download to PDF</button>
                            </div>
                        }
                    />
                    <Link className="is-danger" to="/topics">
                        <div className="hide-button">
                            <button className="button is-info" style={{ backgroundColor: "#00549F" }}>
                                Back to Tests
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
export default SaveLessonToPdf