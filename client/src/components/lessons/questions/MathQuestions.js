import React from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import authHeader from "../../../services/auth-header"
import UserService from "../../../services/user.service"

/**
 * Generates practice math questions from database
 *
 * @author Graham Stoves
 */

class MathQuestions extends React.Component {
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
            question: [],
            results: [],
            btnVal: [],
            totalNumber: 0,
            finalAnswer: [],
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
                this.getQuestions().then(() => {
                    this.setState({ currentIndex: 0 })
                })
            })
    }

    getQuestions = async () => {
        await axios.get('http://localhost:8080/api/mathslesson', {
            headers: authHeader(),
            params: { questionList: this.props.question }
        })
            .then(res => {
                console.log(this.props.question);
                let array = []
                for (let i = 0; i < this.props.question.length; i++) {
                    for (let j = 0; j < this.props.question.length; j++) {
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

    nextQuestionHandler = async () => {
        let answerString = this.state.questionList[this.state.currentIndex].answer
        let answerArray = answerString.split(',')
        let arr = this.state.val
        let answerLength = this.state.questionList[this.state.currentIndex].answer.split(',').length

        if (this.state.userAnswer.length < answerArray.length) {
            alert("You need to input an answer")
            return
        }

        for (let i = 0; i < this.state.userAnswer.length; i++) {
            if (this.state.userAnswer[i] === "") {
                alert("You need to input an answer")
                return
            }
        }

        this.setState({
            totalNumber: this.state.totalNumber + answerLength,
        })

        switch (this.state.questionList[this.state.currentIndex].question_type) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 6:
                for (let i = 0; i < arr.length; i++) {
                    this.state.finalAnswer.push(arr[i])
                    if (arr[i] === answerArray[i]) {
                        await this.setState({
                            score: this.state.score + 1,
                        })
                    }
                    arr[i] = ""
                }
                break
            case 5:
                if (this.state.userAnswer !== null) {
                    for (let i = 0; i < answerArray.length; i++) {
                        this.state.finalAnswer.push(this.state.userAnswer[i])
                        if (answerArray[i] === this.state.userAnswer[i]) {
                            await this.setState({
                                score: this.state.score + 1
                            })
                        }
                    }
                }
                break
            default:
                break
        }

        if (this.state.currentIndex !== this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex + 1,
                userAnswer: [],
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
                    console.log(result)
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

    handleChange(e) {
        let arr = this.state.userAnswer
        arr[e.target.id] = e.target.value
        this.setState({
            userAnswer: arr,
            val: arr
        })
        console.log(this.state.userAnswer);
    }

    displayAnswer = async (e, i, j, buttonsLength) => {
        for (let secondIndex = 0; secondIndex < buttonsLength; secondIndex++) {
            document.getElementById(`${i}.${secondIndex}`).classList.remove("buttonPressed")
        }

        document.getElementById(`${i}.${j}`).classList.add("buttonPressed")

        let userAnswer = document.getElementById(`${i}.${j}`).innerText

        let newUserAnswer = [buttonsLength]
        if (this.state.userAnswer !== null) {
            newUserAnswer = this.state.userAnswer
        }

        newUserAnswer[i] = userAnswer
        await this.setState({
            userAnswer: newUserAnswer
        })
    }

    render() {
        const reactStringReplace = require('react-string-replace')
        let statement = ""
        let question = ""

        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>You need to be logged in to access this page.</h1>
                </div>
            )
        }

        if (this.state.currentIndex === -1) {
            return (
                <div>
                    <h1>Loading Questions...</h1>
                </div>
            )
        }

        console.log(this.state.questionList[this.state.currentIndex]);

        if (this.state.questionList.length > 0 && this.state.currentIndex >= 0) {
            question = this.state.questionList[this.state.currentIndex].question

            if (this.state.questionList[this.state.currentIndex].question.includes("{?}")) {
                question = (
                    <div className="pb-0 mb-4">
                        {reactStringReplace(this.state.questionList[this.state.currentIndex].question, '{?}', (match, i) => (
                            <input
                                style={{ width: "100px" }}
                                className="input is-info mb-4"
                                key={i}
                                type="number"
                                id={Math.floor(i / 2)}
                                placeholder="Answer"
                                value={this.state.val[Math.floor(i / 2)]}
                                onChange={this.handleChange}
                            />
                        ))}
                    </div>)
            }

            if (this.state.questionList[this.state.currentIndex].statement !== null) {
                statement = (
                    <div className="mb-5">
                        {this.state.questionList[this.state.currentIndex].statement}
                    </div>
                )
            }

            if (this.state.questionList[this.state.currentIndex].question_type === 5) {
                let questionString = this.state.questionList[this.state.currentIndex].question
                let array = questionString.split("\n")
                let subArray = []

                for (let i = 0; i < array.length; i++) {
                    subArray.push(array[i].split(" "))
                }

                question = (
                    subArray.map((arr, i) => <div key={i} style={{ display: "flex", marginBottom: "15px" }}>
                        <p>{i + 1})</p>
                        {
                            arr.map((word, j) =>
                                <button
                                    style={{ marginRight: "15px" }}
                                    key={j}
                                    className="button"
                                    id={`${i}.${j}`}
                                    value={this.state.btnVal[Math.floor(j / 2)]}
                                    onClick={(e) => this.displayAnswer(e, i, j, subArray[0].length)}
                                >{word}
                                </button>
                            )
                        }
                    </div>
                    )
                )
            }
        }

        if (this.state.completed) {
            return (
                <div>
                    <h1>Test Completed</h1>
                </div>
            )
        }

        return (
            <div>
                <div>
                    <div className="is-pulled-left p-4" style={{ width: "13%" }}>
                        <h3 className="subtitle is-5 mb-4" style={{ color: "#00549F", fontWeight: "bold" }}>
                            Beginner
                        </h3>

                        <progress
                            id="progressBar"
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
                            Maths
                        </h1>
                    </section>
                </div>

                <div className="container">
                    <div className="card mt-5">
                        <div className="card-content">
                            <div className="content">
                                <h2 className="mb-6">
                                    Question {this.state.currentIndex + 1}
                                </h2>
                                <h3>
                                    <pre
                                        id="question-container"
                                        className="is-pulled-left"
                                        style={{ letterSpacing: "3px", wordSpacing: "5px" }}
                                    >
                                        {statement}
                                        {question}
                                    </pre>
                                </h3>

                                <div className="nextBtn">
                                    {
                                        this.state.currentIndex < this.state.questionList.length - 1 &&
                                        <button
                                            className="button is-info is-outlined mb-3"
                                            onClick={this.nextQuestionHandler}
                                        >
                                            Next Question
                                        </button>
                                    }
                                </div>

                                <div className="finishBtn">
                                    {
                                        this.state.currentIndex === this.state.questionList.length - 1 &&
                                        <button
                                            className="button is-info is-outlined mb-3"
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

export default MathQuestions