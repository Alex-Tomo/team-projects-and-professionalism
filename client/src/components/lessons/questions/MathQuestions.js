import React from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import authHeader from "../../../services/auth-header"
import UserService from "../../../services/user.service"

/**
 * Generates Maths questions from the database
 *
 * @author Graham Stoves
 */

class MathQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loggedIn: false,
            completed: false,
            score: 0,
            currentIndex: -1,
            lessonName: "",
            totalNumber: 0,
            userAnswer: [],
            questionList: [],
            question: [],
            results: [],
            btnVal: [],
            finalAnswer: [],
            val: [""]
        }
        this.handleChange = this.handleChange.bind(this)
    }

    //Only displays the content if the user is logged in using the user service
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

    //Gets all the maths questions from the database, depending on what the lesson id is
    getQuestions = async () => {
        await axios.get('https://kip-learning.herokuapp.com/api/mathslesson', {
            headers: authHeader(),
            params: { questionList: this.props.question, lesson_id: this.props.lesson_id }
        })
            //Pushes all the results into the question list
            .then(res => {
                let questionDetails = []
                for (let i = 0; i < this.props.question.length; i++) {
                    for (let j = 0; j < this.props.question.length; j++) {
                        if (res.data[j].question_id == this.props.question[i]) {
                            questionDetails.push(res.data[j])
                        }
                    }
                }
                this.setState({
                    lessonName: this.props.lessonName,
                    questionList: questionDetails
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

    handleChange(e) {
        let userAnswer = this.state.userAnswer
        userAnswer[e.target.id] = e.target.value
        this.setState({
            userAnswer: userAnswer,
            val: userAnswer
        })
    }

    //Function that allows the user to select 1 button button from each row
    buttonSelected = async (e, i, j, buttonsLength) => {
        for (let x = 0; x < buttonsLength; x++) {
            document.getElementById(`${i}.${x}`).classList.remove("button-pressed")
        }

        document.getElementById(`${i}.${j}`).classList.add("button-pressed")

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

    //Function which handles the next question click, checking answer has correct input
    nextQuestionHandler = async () => {
        let answerLength = this.state.questionList[this.state.currentIndex].answer.split(',').length
        let answerString = this.state.questionList[this.state.currentIndex].answer
        let questionType = this.state.questionList[this.state.currentIndex].question_type
        let userAnswer = this.state.userAnswer
        let answerArray = answerString.split(',')
        let inputValue = this.state.val
        let replaceSlash = ""
        let replaceColon = ""
        let newUserAnswer = []
        let lengthDoubled = []

        //If the question includes a / or :, replace these with a space so input validation can be done
        if (questionType == 5) {
            answerLength = answerLength * 2
            if (userAnswer.length < answerLength) {
                this.setState({
                    error: "Field cannot be left empty"
                })
                return
            } else {
                let userAnswerString = this.state.userAnswer.toString()
                if (questionType == 5 && answerString.includes('/')) {
                    replaceSlash = userAnswerString.replace(',', '/')
                    newUserAnswer = replaceSlash.split(" ")
                } else if (questionType == 5 && answerString.includes(':')) {
                    replaceColon = userAnswerString.replace(',', ':')
                    newUserAnswer = replaceColon.split(" ")
                }
                lengthDoubled.length = newUserAnswer.length * 2
            }
        }

        if (userAnswer.length < answerArray.length) {
            this.setState({
                error: "Field cannot be left empty"
            })
            return
        }

        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i] == "" || userAnswer[i] == undefined) {
                this.setState({
                    error: "Field cannot be left empty"
                })
                return
            }
        }

        //This switch checks the users answer against answer in database depending on what question type it is. Will add 1 point to the score for each input they get right.
        switch (questionType) {
            case 1:
            case 2:
            case 3:
                for (let i = 0; i < inputValue.length; i++) {
                    this.state.finalAnswer.push(inputValue[i])
                    if (inputValue[i] == answerArray[i]) {
                        await this.setState({
                            score: this.state.score + 1,
                        })
                    }
                    inputValue[i] = ""
                }
                this.setState({
                    totalNumber: this.state.totalNumber + answerLength,
                })
                break
            case 4:
                if (userAnswer !== null) {
                    for (let i = 0; i < answerArray.length; i++) {
                        this.state.finalAnswer.push(userAnswer[i])
                        if (answerArray[i] == userAnswer[i]) {
                            await this.setState({
                                score: this.state.score + 1
                            })
                        }
                    }
                }
                this.setState({
                    totalNumber: this.state.totalNumber + answerLength,
                })
                break
            case 5:
                for (let i = 0; i < newUserAnswer.length; i++) {
                    if (newUserAnswer[i] == answerArray[i]) {
                        await this.setState({
                            score: this.state.score + 1,
                        })
                    }
                    for (let x = 0; x < lengthDoubled.length; x++) {
                        this.state.finalAnswer.push(inputValue[x])
                    }
                    newUserAnswer[i] = ""
                    inputValue[i] = ""
                    inputValue[i + 1] = ""
                }
                answerLength = answerLength / 2
                this.setState({
                    totalNumber: this.state.totalNumber + answerLength,
                })
                break
            default:
                for (let i = 0; i < inputValue.length; i++) {
                    this.state.finalAnswer.push(inputValue[i])
                    if (inputValue[i] == answerArray[i]) {
                        await this.setState({
                            score: this.state.score + 1,
                        })
                    }
                    inputValue[i] = ""
                }
                this.setState({
                    totalNumber: this.state.totalNumber + answerLength,
                })
                break
        }

        //Checks whether there are any more questions, if there isn't, post the lesson data to the user lessons table
        if (this.state.currentIndex !== this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex + 1,
                userAnswer: [],
                val: inputValue,
                error: ""
            })
        } else if (this.state.currentIndex == this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex,
                completed: true
            })

            let answers = {
                userAnswers: this.state.finalAnswer
            }
            let stringAnswers = JSON.stringify(answers)

            axios.post('https://kip-learning.herokuapp.com/api/userlessons', {
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

    render() {
        const reactStringReplace = require('react-string-replace')
        let lessonName = ""
        let statement = ""
        let question = ""
        let questionType = 0
        let currentIndex = ""

        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>You need to be logged in to access this page.</h1>
                </div>
            )
        }

        if (this.state.currentIndex == -1) {
            return (
                <div>
                    <div className="spinner"></div>
                    <div className="login-loading">Loading Questions</div>
                </div>
            )
        }

        if (this.state.questionList.length > 0 && this.state.currentIndex >= 0) {
            lessonName = this.state.lessonName
            question = this.state.questionList[this.state.currentIndex].question
            statement = this.state.questionList[this.state.currentIndex].statement
            questionType = this.state.questionList[this.state.currentIndex].question_type
            currentIndex = this.state.currentIndex

            //If the question inclues {?}, replace this with an input box so the user can type in the answer
            if (question.includes("{?}")) {
                question = (
                    <div className="pb-0 mb-4">
                        {reactStringReplace(question, '{?}', (match, i) => (
                            <input
                                style={{ width: "80px" }}
                                className="input is-info mb-4"
                                key={i}
                                type="number"
                                id={Math.floor(i / 2)}
                                placeholder="Answer"
                                value={this.state.val[Math.floor(i / 2)]}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                        ))}
                    </div>)
            }

            if (statement !== null) {
                statement = (
                    <div className="mb-5">
                        {statement}
                    </div>
                )
            }

            //If the question type is 4, it includes buttons which need to be split onto a new line
            if (questionType == 4) {
                let questionString = this.state.questionList[this.state.currentIndex].question
                let questionArray = questionString.split("\n")
                let questionSubArray = []

                for (let i = 0; i < questionArray.length; i++) {
                    questionSubArray.push(questionArray[i].split(" "))
                }

                question = (
                    questionSubArray.map((arr, i) => <div key={i} style={{ display: "flex", marginBottom: "15px" }}>
                        <p>{i + 1})</p>
                        {
                            arr.map((number, j) =>
                                <button
                                    style={{ marginRight: "15px" }}
                                    key={j}
                                    className="button"
                                    id={`${i}.${j}`}
                                    value={this.state.btnVal[Math.floor(j / 2)]}
                                    onClick={(e) => this.buttonSelected(e, i, j, questionSubArray[0].length)}
                                >{number}
                                </button>
                            )}
                    </div>
                    ))
            }
        }

        if (this.state.completed) {
            return (
                <div style={{ textAlign: "center", marginTop: "200px" }}>
                    <div className="box is-shadowless">
                        <div className="columns">
                            <div className="column" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                <h4 className="title is-2 mb-3 has-text-weight-bold">Test Complete!</h4>
                            </div>
                        </div>
                        <div>
                            <Link className="is-danger" to="/completed">
                                <button className="title is-4 button is-info mb-6" style={{ backgroundColor: "#00549F" }}>Completed Tests</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="progress-desktop-view">
                    <div className="is-pulled-left p-4" style={{ width: "13%" }}>
                        <h3 className="subtitle is-5 mb-4" style={{ color: "#00549F", fontWeight: "bold" }}>Progress</h3>

                        <progress
                            id="progress-bar"
                            className="progress is-branding mt-0 mb-2"
                            value={currentIndex}
                            max={this.state.questionList.length - 1}
                        />

                        <div className="questionIndex is-pulled-right mr-3">
                            {`${currentIndex + 1} of ${this.state.questionList.length}`}
                        </div>
                    </div>
                    <section className="section is-small sub-home-background" style={{ marginLeft: "13%" }}>
                        <h1 className="title is-2 has-text-weight-bold">{lessonName}</h1>
                    </section>
                </div>

                <div className="progress-mobile-view">
                    <section className="section is-small sub-home-background">
                        <h1 className="title is-2 has-text-weight-bold">{lessonName}</h1>
                    </section>
                    <div className="pt-6 pl-6 pr-6 pb-4">
                        <h3 className="subtitle is-5 mb-4" style={{ color: "#00549F", fontWeight: "bold" }}>Progress</h3>

                        <progress
                            id="progress-bar"
                            className="progress is-branding mt-0 mb-2"
                            value={currentIndex}
                            max={this.state.questionList.length - 1}
                        />

                        <div className="questionIndex is-pulled-right mr-3">
                            {`${currentIndex + 1} of ${this.state.questionList.length}`}
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="card mt-5 main-question-container">
                        <div className="card-content">
                            <div className="content">
                                <h2 className="mb-3">Question {currentIndex + 1}</h2>
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

                                <p style={{ color: "red" }}>{this.state.error}</p>

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
                                        this.state.currentIndex == this.state.questionList.length - 1 &&
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