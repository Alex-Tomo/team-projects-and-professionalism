import React from "react"
import axios from "axios"
import UserService from "../../services/user.service"
import authHeader from "../../services/auth-header"
import { Link } from "react-router-dom"
import ReactToPrint from 'react-to-print';
import Question1 from './questions/nonverbalreasoningimages/question_1.svg'

class Completed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answers: JSON.parse(this.props.answer),
            lessons: [],
            questionList: [],
            lessonType: "",
            questionValue: [],
            answersArray: [],
            answerList: [],
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
                        answerList: res.data.map((answer) => ({
                            answers: [
                                answer.answer,
                                answer.incorrect_answer_one,
                                answer.incorrect_answer_two,
                                answer.incorrect_answer_three,
                                answer.incorrect_answer_four
                            ].sort(() => Math.random() - 0.5)
                        }))
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
        let index = -1
        let style = []
        let filename = ""
        const images = this.importAll(require.context('./nonverbalreasoningimages', false, /\.(svg)$/))

        if (this.state.answers.userAnswers === undefined) {
            return (
                <div>
                    <div className="spinner"></div>
                    <div className="login-loading">Loading...</div>
                </div>
            )
        }

        if (this.state.lessonType == "math") {
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    return (
                        <div style={{ textAlign: "center" }}>
                            <div key={i} className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Your Score: {this.props.score} out of {this.props.potentialScore}</h4>
                                </div><br />
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        let question = result.question
                                        let answer = this.state.answers.userAnswers
                                        let array = result.answer.split(",")

                                        for (let x = 0; x < array.length; x++) {
                                            if (this.state.answers.userAnswers[index + x + 1] == array[x]) {
                                                style.push("#1AA260")
                                            } else {
                                                style.push("#EA4335")
                                            }
                                        }

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
                                                                type="number"
                                                                value={answer[index]}
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
                                                    let oneAnswer = result.answer.split(",")[i]
                                                    index++
                                                    return (
                                                        <div key={i} style={{ display: "flex", marginBottom: "15px", width: "500px", margin: "auto" }}>
                                                            <p>{i + 1})</p>
                                                            {
                                                                arr.map((word, j) => {
                                                                    let backgroundCol = ""

                                                                    if (word == this.state.answers.userAnswers[index]) {
                                                                        if (word == oneAnswer) {
                                                                            backgroundCol = "#1AA260"
                                                                        } else {
                                                                            backgroundCol = "#EA4335"
                                                                        }
                                                                    }

                                                                    return (
                                                                        <button
                                                                            style={{ marginRight: "15px", backgroundColor: backgroundCol }}
                                                                            key={j}
                                                                            className="button mb-3"
                                                                            id={`${i}.${j}`}
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
                                                    className="pb-0"
                                                    style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                                >
                                                    {result.statement}
                                                    {question}
                                                </pre>
                                                <p className="pb-6">Correct answer/answers: {result.answer}</p>
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
                                </div>
                                <div>
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Your Score: {this.props.score} out of {this.props.potentialScore}</h4>
                                </div><br />
                                <div>
                                    <pre>{this.state.questionList[0].english_story.story}</pre>
                                </div>
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        let question = result.question
                                        let answersList = []
                                        //console.log(result.incorrect_answer_four);
                                        answersList = result.answer

                                        //console.log(this.state.answerList[0].answers);
                                        {
                                            this.state.answerList.map((answer, i) => {
                                                console.log(answer.answers);

                                                return (
                                                    <div key={i}>
                                                        <button
                                                            id="answer"
                                                            key={answer}
                                                            className={"button mr-3 mb-3 is-outlined is-info"}
                                                            value={answer.answers}
                                                        >
                                                            {answer.answers}
                                                        </button>
                                                        <br />
                                                    </div>
                                                )
                                            })
                                        }


                                        return (
                                            <div>
                                                <pre
                                                    id="question-container"
                                                    className="pb-0"
                                                    style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                                >
                                                    {question}
                                                </pre>
                                                <p className="pb-6">Correct answer: {result.answer}</p>
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
                    return (
                        <div style={{ textAlign: "center" }}>
                            <div key={i} className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Your Score: {this.props.score} out of {this.props.potentialScore}</h4>
                                </div><br />
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        let question = result.question
                                        let answer = this.state.answers.userAnswers
                                        let array = result.answer.split(",")

                                        for (let x = 0; x < array.length; x++) {
                                            if (this.state.answers.userAnswers[index + x + 1] == array[x]) {
                                                style.push("#1AA260")
                                            } else {
                                                style.push("#EA4335")
                                            }
                                        }
                                        <input
                                            style={{ width: "150px" }}
                                            className="input is-info ml-6"
                                            placeholder="Answer"
                                            value={this.state.val}
                                            onChange={this.handleChange}
                                            maxLength="1"
                                            autoComplete="off"
                                        />

                                        return (
                                            <div>
                                                <pre
                                                    id="question-container"
                                                    className="pb-0"
                                                    style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                                >
                                                    <img style={{ width: "50%" }} src={Question1} alt="Non-Verbal" />
                                                </pre>
                                                <p className="pb-2">Your answer: {this.state.answers.userAnswers[0]}</p>
                                                <p className="pb-6">Correct answer: {result.answer}</p>
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
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    return (
                        <div style={{ textAlign: "center" }}>
                            <div key={i} className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Your Score: {this.props.score} out of {this.props.potentialScore}</h4>
                                </div><br />
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        let question = result.question
                                        let answer = this.state.answers.userAnswers
                                        let array = result.answer.split(",")



                                        for (let x = 0; x < array.length; x++) {
                                            if (this.state.answers.userAnswers[index + x + 1] == array[x]) {
                                                console.log(this.state.answers.userAnswers[index]);
                                                style.push("#1AA260")
                                            } else {
                                                style.push("#EA4335")
                                            }
                                        }

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
                                                                type="number"
                                                                defaultValue={answer[index]}
                                                            />
                                                        )
                                                    })}
                                                </div>)
                                        }

                                        return (
                                            <div>
                                                <pre
                                                    id="question-container"
                                                    className="pb-0"
                                                    style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                                >
                                                    {result.statement}
                                                    {question}
                                                </pre>
                                                <p className="pb-6">Correct answer/answers: {result.answer}</p>
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
                < div style={{ textAlign: "center" }}>
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
                </div >
            </div >
        )

    }
}
export default Completed