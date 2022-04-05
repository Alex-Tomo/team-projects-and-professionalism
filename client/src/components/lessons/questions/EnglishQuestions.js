import React from "react"
import axios from "axios"
import authHeader from "../../../services/auth-header"
import UserService from "../../../services/user.service"

/**
 * Generates practice English questions from database
 *
 * @author Graham Stoves
 */

class EnglishQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loggedIn: false,
            userAnswer: [],
            completed: false,
            score: 0,
            currentIndex: -1,
            storyIndex: 0,
            questionList: [],
            totalNumber: 0,
            storyList: [],
            selectedAnswer: true,
            answerList: [],
            finalAnswer: []
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
                this.getQuestions().then(() => {
                    this.setState({ currentIndex: 0 })
                })
            })
    }

    getQuestions = async () => {
        await axios.get('http://localhost:8080/api/englishlesson', {
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

    handleAnswer = (answer) => {
        this.setState({
            userAnswer: answer,
        })
    }

    nextQuestionHandler = async () => {
        let answerLength = this.state.questionList[this.state.currentIndex].answer.split(',').length
        let answerString = this.state.questionList[this.state.currentIndex].answer
        let answerArray = answerString.split(',')

        if (this.state.userAnswer.length < answerArray.length) {
            alert("You need to input an answer")
            return
        }

        this.setState({
            totalNumber: this.state.totalNumber + answerLength,
        })
        this.state.finalAnswer.push(this.state.userAnswer)

        if (this.state.userAnswer === this.state.questionList[this.state.currentIndex].answer) {
            this.setState({
                score: this.state.score + 1
            })
        }

        if (this.state.currentIndex !== this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex + 1,
                userAnswer: [],
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

    render() {
        let title = ""
        let story = ""
        let question = ""
        let answersList = []

        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>You need to be logged in to access this page.</h1>
                </div>
            )
        }

        if (this.state.questionList.length > 0 && this.state.currentIndex >= 0) {
            title = this.state.questionList[this.state.currentIndex].english_story.title
            story = this.state.questionList[this.state.currentIndex].english_story.story
            question = this.state.questionList[this.state.currentIndex].question
            answersList = this.state.answerList[this.state.currentIndex].answers
        }

        if (this.state.currentIndex === -1) {
            return (
                <div>
                    <h1>Loading Questions...</h1>
                </div>
            )
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
                <div className="top">
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
                                English
                            </h1>
                        </section>
                    </div>
                </div>

                <div className="container">
                    <div className="card mt-5 mb-6">
                        <div className="card-content">
                            <div className="content">
                                <h2 className="mb-4">
                                    Question {this.state.currentIndex + 1}
                                </h2>

                                <div id="englishContainer">
                                    <pre id="storyText" className="is-pulled-left mr-6">
                                        <h2>{title}</h2>
                                        <p style={{
                                            textAlign: "left",
                                            whiteSpace: "pre-line"
                                        }}>
                                            {story}
                                        </p>
                                    </pre>

                                    <div className="mb-6">
                                        <h3 className="mt-0">
                                            {question}
                                        </h3>
                                        <div>
                                            {
                                                answersList.map((answer, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <button
                                                                id="answer"
                                                                key={answer}
                                                                className={"button mr-3 mb-3 is-outlined is-info"}
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
                </div>
            </div>
        )
    }
}

export default EnglishQuestions