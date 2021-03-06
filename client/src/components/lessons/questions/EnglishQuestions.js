import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import authHeader from "../../../services/auth-header"
import UserService from "../../../services/user.service"

/**
 * Generates English questions from the database
 *
 * @author Graham Stoves
 */

class EnglishQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loggedIn: false,
            completed: false,
            selectedAnswer: true,
            score: 0,
            currentIndex: -1,
            storyIndex: 0,
            lessonName: "",
            totalNumber: 0,
            userAnswer: [],
            questionList: [],
            storyList: [],
            answerList: [],
            finalAnswer: []
        }
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

    //Gets all english questions from the database, depending on what the lesson id is
    getQuestions = async () => {
        await axios.get('https://kip-learning.herokuapp.com/api/englishlesson', {
            headers: authHeader(),
            params: { questionList: this.props.question }
        })
            //Pushes all the results into the question list
            .then(res => {
                let questionDetails = []
                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res.data.length; j++) {
                        if (res.data[j].question_id == this.props.question[i]) {
                            questionDetails.push(res.data[j])
                        }
                    }
                }
                this.setState({
                    lessonName: this.props.lessonName,
                    questionList: questionDetails,
                    answerList: res.data.map((answer) => ({
                        answers: [
                            answer.answer,
                            answer.incorrect_answer_one,
                            answer.incorrect_answer_two,
                            answer.incorrect_answer_three,
                            answer.incorrect_answer_four
                        ].sort(() => Math.random() - 0.5) //Randomises the options that the user clicks on
                    }))
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

    handleAnswer = (answer) => {
        this.setState({
            userAnswer: answer,
        })
    }

    //Function which handles the next question click, checking answer has correct input
    nextQuestionHandler = async () => {
        let answerLength = this.state.questionList[this.state.currentIndex].answer.split(',').length
        let answerString = this.state.questionList[this.state.currentIndex].answer
        let userAnswer = this.state.userAnswer
        let answerArray = answerString.split(',')

        if (userAnswer.length < answerArray.length) {
            this.setState({
                error: "You need to select an answer."
            })
            return
        }

        //Tallies up the total max number of points the user can get
        this.setState({
            totalNumber: this.state.totalNumber + answerLength,
        })
        this.state.finalAnswer.push(userAnswer)

        //If the users answer is the same as the answer in database they get a point
        if (userAnswer == answerString) {
            this.setState({
                score: this.state.score + 1
            })
        }

        //Checks whether there are any more questions, if there isn't, post the lesson data to the user lessons table
        if (this.state.currentIndex !== this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex + 1,
                userAnswer: [],
                error: ""
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
        let lessonName = ""
        let title = ""
        let story = ""
        let question = ""
        let currentIndex = ""
        let answersList = []

        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>You need to be logged in to access this page.</h1>
                </div>
            )
        }

        if (currentIndex === -1) {
            return (
                <div>
                    <div className="spinner"></div>
                    <div className="login-loading">Loading Questions</div>
                </div>
            )
        }

        if (this.state.questionList.length > 0 && this.state.currentIndex >= 0) {
            lessonName = this.state.lessonName
            title = this.state.questionList[this.state.currentIndex].english_story.title
            story = this.state.questionList[this.state.currentIndex].english_story.story
            question = this.state.questionList[this.state.currentIndex].question
            answersList = this.state.answerList[this.state.currentIndex].answers
            currentIndex = this.state.currentIndex
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
                    <div className="card mt-5 mb-6 main-question-container">
                        <div className="card-content">
                            <div className="content">
                                <h2 className="mb-4">Question {currentIndex + 1}</h2>
                                <div id="english-container">
                                    <div className="is-pulled-left">
                                        <h2 style={{ textDecoration: "underline" }}>{title}</h2>
                                        <pre id="story-text">{story}</pre>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="mt-0">{question}</h3>
                                        <div>
                                            {
                                                answersList.map((answer, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <button
                                                                id="answer"
                                                                key={answer}
                                                                className={"english-button button mr-3 mb-3 is-outlined is-info"}
                                                                answer={answer}
                                                                onClick={() => this.handleAnswer(answer)}>
                                                                {answer}
                                                            </button>
                                                            <br />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <p style={{ color: "red" }}>{this.state.error}</p>

                                        <div className="nextBtn">
                                            {
                                                currentIndex < this.state.questionList.length - 1 && (
                                                    <button
                                                        className="button is-outlined mb-3"
                                                        onClick={this.nextQuestionHandler}
                                                    >
                                                        Next Question
                                                    </button>
                                                )}
                                        </div>

                                        <div className="finishBtn">
                                            {
                                                currentIndex === this.state.questionList.length - 1 &&
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
                </div>
            </div>
        )
    }
}

export default EnglishQuestions