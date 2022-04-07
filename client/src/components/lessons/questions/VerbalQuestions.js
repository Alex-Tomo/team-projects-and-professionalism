import React from "react"
import axios from "axios"
import authHeader from "../../../services/auth-header"
import UserService from "../../../services/user.service"
import { Link } from "react-router-dom"

/**
 * Generates practice verbal reasoning questions from database
 *
 * @author Graham Stoves
 */

class VerbalQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loggedIn: false,
            userAnswer: [],
            completed: false,
            score: 0,
            currentIndex: -1,
            questionList: [],
            totalNumber: 0,
            finalAnswer: [],
            results: [],
            val: [""]
        }
        this.handleChange = this.handleChange.bind(this)
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
                if (this.props.question != null) {
                    this.getQuestions().then(() => {
                        this.setState({ currentIndex: 0 })
                    })
                }
            })
    }

    getQuestions = async () => {
        await axios.get('http://localhost:8080/api/verballesson', {
            headers: authHeader(),
            params: { questionList: this.props.question }
        })
            .then(res => {
                let array = []
                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res.data.length; j++) {

                        if (res.data[j].question_id === this.props.question[i]) {
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

    handleChange(e) {
        const numbers = /\d+/g
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g
        const foundNumber = e.target.value.match(numbers);
        const foundSpecialChar = e.target.value.match(specialChars);

        if (foundNumber != null || foundSpecialChar != null) {
            this.setState({
                error: "You can only type in letters."
            })
            return
        }

        let arr = this.state.userAnswer
        arr[e.target.id] = e.target.value
        this.setState({
            userAnswer: arr,
            error: "",
            val: arr
        })
    }

    nextQuestionHandler = async () => {
        let answerString = this.state.questionList[this.state.currentIndex].answer
        let answerArray = answerString.split(',')
        let arr = this.state.val
        let answerLength = this.state.questionList[this.state.currentIndex].answer.split(',').length

        if (this.state.userAnswer.length < answerArray.length) {
            this.setState({
                error: "Field cannot be left empty"
            })
            return
        }

        for (let i = 0; i < this.state.userAnswer.length; i++) {
            if (this.state.userAnswer[i] === "") {
                this.setState({
                    error: "Field cannot be left empty"
                })
                return
            }
            if (this.state.userAnswer[i] === undefined) {
                this.setState({
                    error: "You can only type in letters."
                })
                return
            }
        }

        this.setState({
            totalNumber: this.state.totalNumber + answerLength,
        })

        for (let i = 0; i < arr.length; i++) {
            this.state.finalAnswer.push(arr[i])
            if (arr[i] === answerArray[i]) {
                await this.setState({
                    score: this.state.score + 1,

                })
            }
            arr[i] = ""
        }

        if (this.state.currentIndex !== this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex + 1,
                userAnswer: [],
                error: "",
                val: arr
            })
        } else if (this.state.currentIndex === this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex,
                completed: true
            })

            let answers = {
                userAnswers: this.state.finalAnswer
            }

            let stringAnswers = JSON.stringify(answers)

            axios.post('http://localhost:8080/api/userlessons', {
                lessonId: this.props.lessonId,
                userId: JSON.parse(localStorage.getItem('user')).id,
                completed: this.state.completed,
                userScore: this.state.score,
                possibleScore: this.state.totalNumber,
                userAnswers: stringAnswers
            },
                {
                    headers: authHeader()
                }).then((result) => {
                }).catch(e => {
                    console.log(e)
                })

            return (
                <div>
                    <p>Added</p>
                </div>
            )
        }
    }

    render() {
        let question = ""
        const reactStringReplace = require('react-string-replace')

        if (this.state.questionList.length > 0 && this.state.currentIndex >= 0) {
            question = this.state.questionList[this.state.currentIndex].question

            if (this.state.questionList[this.state.currentIndex].question.includes("{?}")) {
                question = (
                    <div className="pb-0 mb-4">
                        {reactStringReplace(this.state.questionList[this.state.currentIndex].question, '{?}', (match, i) => (
                            <input
                                style={{ width: "100px" }}
                                className="input is-info ml-3 mb-3"
                                key={i}
                                id={Math.floor(i / 2)}
                                placeholder="Answer"
                                value={this.state.val[Math.floor(i / 2)]}
                                onChange={this.handleChange}
                                maxLength="1"
                                autoComplete="off"
                            />
                        ))}
                    </div>)
            }
        }

        if (this.state.currentIndex === -1) {
            return (
                <div>
                    <div className="spinner"></div>
                    <div className="login-loading">Loading Questions</div>
                </div>
            )
        }

        if (this.state.completed) {
            return (
                <div style={{ textAlign: "center", marginTop: "200px" }}>
                    <div className="box is-shadowless">
                        <div className="columns">
                            <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                <h4 className="title is-2 mb-3 has-text-weight-bold">Test Complete!</h4>
                            </div>
                        </div>
                        <div>
                            <Link className="is-danger" to="/completed">
                                <button className="title is-4 button is-info mb-6" style={{ backgroundColor: "#00549F" }}>
                                    Completed Tests
                                </button>
                            </Link>
                        </div>
                    </div>
                </div >
            )
        }

        return (
            <div>
                <div className="top">
                    <div>
                        <div className="is-pulled-left p-4" style={{ width: "13%" }}>
                            <h3 className="subtitle is-5 mb-4" style={{ color: "#00549F", fontWeight: "bold" }}>
                                Progress
                            </h3>

                            <progress
                                id="progress-bar"
                                className="progress is-branding mt-0 mb-2"
                                value={this.state.currentIndex}
                                max={this.state.questionList.length - 1}
                            />

                            <div className="questionIndex is-pulled-right mr-3">
                                {`${this.state.currentIndex + 1} of ${this.state.questionList.length}`}
                            </div>

                        </div>
                        <section className="section is-small sub-home-background" style={{ marginLeft: "13%" }}>
                            <h1 className="title is-2 has-text-weight-bold">
                                Verbal Reasoning
                            </h1>
                        </section>
                    </div>
                </div>

                <div className="container">
                    <div className="card mt-5">
                        <div className="card-content">
                            <div className="content">
                                <h2 className="mb-4">Question {this.state.currentIndex + 1}</h2>

                                <h3 className="mt-0">
                                    <pre>
                                        {question}
                                    </pre>
                                </h3>

                                <p style={{ color: "red" }}>{this.state.error}</p>

                                <div className="nextBtn">
                                    {
                                        this.state.currentIndex < this.state.questionList.length - 1 && (
                                            <button
                                                className="button is-outlined mb-3"
                                                onClick={this.nextQuestionHandler}
                                            >
                                                Next Question
                                            </button>
                                        )
                                    }
                                </div>

                                {/* TODO - Why is there an === then button? *Alex */}
                                <div className="finishBtn">
                                    {
                                        this.state.currentIndex === this.state.questionList.length - 1 &&
                                        <button
                                            className="button is-info is-outlined"
                                            onClick={this.nextQuestionHandler}
                                        >
                                            Finish
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VerbalQuestions