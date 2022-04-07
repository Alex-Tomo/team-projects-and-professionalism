import React from "react"
import axios from "axios"
import UserService from "../../services/user.service"
import authHeader from "../../services/auth-header"
import { Link } from "react-router-dom"
import ReactToPrint from "react-to-print"
import Question1 from './questions/nonverbalreasoningimages/question_1.svg'

class SaveLessonToPdf extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        await axios.get('http://localhost:8080/api/lessons', {
            headers: authHeader(),
            params: {
                lesson_id: this.props.lessonId
            }
        }).then(res => {
            this.setState({
                lessons: res.data
            })
        }).catch(e => {
            console.log("error: " + e)
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
                    url = "http://localhost:8080/api/mathslesson"
                    break
                case "english":
                    url = "http://localhost:8080/api/englishlesson"
                    break
                case "verbal_reasoning":
                    url = "http://localhost:8080/api/verballesson"
                    break
                case "non_verbal_reasoning":
                    url = "http://localhost:8080/api/nonverballesson"
                    break
                default:
                    break
            }

            await axios.get(url, {
                headers: authHeader(),
                params: { questionList: questionArray }
            })
                .then(res => {
                    let array = []
                    for (let i = 0; i < questionArray.length; i++) {
                        for (let j = 0; j < questionArray.length; j++) {
                            if (res.data[j].question_id === questionArray[i]) {
                                array.push(res.data[j])
                            }
                        }
                    }
                    this.setState({
                        questionList: array,
                    })
                }).catch(e => {
                    console.log("error: " + e)
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
        let lesson = ""

        if (this.state.lessonType == "math") {
            lesson = this.state.lessons.map((res, i) => {
                return (
                    <div style={{ textAlign: "center" }}>
                        <div key={i} className="box is-shadowless">
                            <div className="columns">
                                <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                </div>
                            </div><br />
                            <div>{

                                this.state.questionList.map((result, i) => {
                                    let question = result.question

                                    if (result.question.includes("{?}")) {
                                        question = (
                                            <div className="pb-0">
                                                {reactStringReplace(result.question, '{?}', (match, i) => {
                                                    return (
                                                        <input
                                                            style={{ width: "100px", color: "white" }}
                                                            className="input is-info mb-3"
                                                            key={i}
                                                            type="number"
                                                            value=""
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

                                        question = (
                                            subArray.map((arr, i) => {
                                                return (
                                                    <div key={i} style={{ display: "flex", marginBottom: "15px", width: "500px", margin: "auto" }}>
                                                        <p>{i + 1})</p>
                                                        {
                                                            arr.map((word, j) => {
                                                                return (
                                                                    <button
                                                                        style={{ marginRight: "15px" }}
                                                                        key={j}
                                                                        className="button mb-3"
                                                                        id={`${i}.${j}`}
                                                                    //disabled
                                                                    >{word}
                                                                    </button>
                                                                )
                                                            }
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })
                                        )
                                    }

                                    return (
                                        <div>
                                            <pre
                                                id="question-container"
                                                className="pb-6"
                                                style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                            >
                                                {result.statement}
                                                {question}
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

        if (this.state.lessonType == "english") {
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    return (
                        <div style={{ textAlign: "center" }}>
                            <div key={i} className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div><br />
                                <div>
                                    <pre>{this.state.questionList[0].english_story.story}</pre>
                                </div>
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        let question = result.question
                                        let answersList = []
                                        //console.log(result.incorrect_answer_four);
                                        //console.log(this.state.answerList[0].answers);

                                        return (
                                            <div>
                                                <pre
                                                    id="question-container"
                                                    className="pb-5"
                                                    style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                                >
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

        if (this.state.lessonType == "verbal_reasoning") {
            let index = -1
            let style = ""
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    return (
                        <div style={{ textAlign: "center" }}>
                            <div key={i} className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div><br />
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        let question = result.question

                                        if (result.question.includes("{?}")) {
                                            question = (
                                                <div className="pb-0">
                                                    {reactStringReplace(result.question, '{?}', (match, i) => {
                                                        index++
                                                        return (
                                                            <input
                                                                style={{ width: "100px", color: "white", backgroundColor: style[index] }}
                                                                className="input is-info mb-3"
                                                                key={i}
                                                            />
                                                        )
                                                    })}
                                                </div>)
                                        }

                                        return (
                                            <div>
                                                <pre
                                                    id="question-container"
                                                    className="pb-6"
                                                    style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                                >
                                                    {question}
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
            let index = -1
            let style = ""
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    return (
                        <div style={{ textAlign: "center" }}>
                            <div key={i} className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div><br />
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        return (
                                            <div>
                                                <pre
                                                    id="question-container"
                                                    className="pb-0"
                                                    style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                                >
                                                    <img style={{ width: "50%" }} src={Question1} alt="Non-Verbal" />
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


        return (
            <div ref={(response) => (this.componentRef = response)}>
                {lesson}
                <div style={{ textAlign: "center" }}>
                    <ReactToPrint
                        content={() => this.componentRef}
                        trigger={() =>
                            <button className="button is-outline mb-3">Download to PDF</button>
                        }
                    />
                    <div>
                        <Link className="is-danger" to="/topics">
                            <button className="button is-info" style={{ backgroundColor: "#00549F" }}>
                                Back to Tests
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default SaveLessonToPdf