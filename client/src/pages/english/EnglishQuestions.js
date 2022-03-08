import React from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import UserService from "../../services/user.service";

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
            userAnswer: null,
            questionsEnd: false,
            score: 0,
            currentIndex: -1,
            storyIndex: 0,
            questionList: [],
            storyList: [],
            selectedAnswer: true,
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
                this.getStory().then(() => { this.setState({ storyIndex: 0 }) })
                this.getQuestions().then(() => { this.setState({ currentIndex: 0 }) })
            })
    }

    getStory = () => {
        return axios.get('http://localhost:8080/api/englishstory', { headers: authHeader() })
            .then(res => {
                this.setState({
                    storyList: res.data
                });
                console.log(res.data);
            }).catch(e => {
                console.log("error: " + e)
            })
    }

    getQuestions = () => {
        return axios.get('http://localhost:8080/api/englishlesson', { headers: authHeader() })
            .then(res => {
                this.setState({
                    questionList: res.data.map((question) => ({
                        ...question,
                        answers: [
                            question.answer,
                            question.incorrect_answer_one,
                            question.incorrect_answer_two,
                            question.incorrect_answer_three,
                            question.incorrect_answer_four
                        ].sort(() => Math.random() - 0.5)
                    }))
                })
                console.log(res.data);
            }).catch(e => {
                console.log("error: " + e)
            })
    }

    handleAnswer = (answer) => {
        this.setState({
            userAnswer: answer,
        })
    }

    nextQuestionHandler = () => {
        if (this.state.userAnswer === this.state.questionList[this.state.currentIndex].answer) {
            this.setState({
                score: this.state.score + 1
            })
            console.log("Well done")
        }

        if (this.state.currentIndex !== this.state.questionList.length - 1) {
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                userAnswer: null
            })
        } else if (this.state.currentIndex === this.state.questionList.length - 1) {
            this.setState({
                currentIndex: this.state.currentIndex,
                questionsEnd: true
            })
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

        if (this.state.questionList.length > 0 && this.state.currentIndex >= 0 && this.state.storyList.length > 0) {
            console.log(this.state.questionList[this.state.currentIndex].answer)
            title = this.state.storyList[this.state.storyIndex].title
            story = this.state.storyList[this.state.storyIndex].story
            question = this.state.questionList[this.state.currentIndex].question
            answersList = this.state.questionList[this.state.currentIndex].answers
        }

        if (this.state.currentIndex === -1) {
            return (
                <div>
                    <h1>Loading Questions...</h1>
                </div>
            )
        }

        if (this.state.questionsEnd) {
            return (
                <div>
                    <h1>You scored {this.state.score} out of {this.state.questionList.length}.</h1>
                </div>
            )
        }

        return (
            <div>
                <div className="top">
                    <div className="container">
                        <h1 className="title is-2 has-text-weight-bold">English Test</h1>
                        <p className="subtitle is-6">Increase productivity of customer service staff and improve your customer.Increase productivity of customer service staff and improve your customer.</p>
                    </div>
                </div>

                <div className="container">
                    <div className="card mt-5 mb-6">
                        <div className="card-content">
                            <div className="content">
                                <h2 className="mb-4">Question {this.state.currentIndex + 1}</h2>

                                <progress id="progressBar" className="progress is-primary mt-0" value={this.state.currentIndex} max={this.state.questionList.length - 1}></progress>

                                <div id="englishContainer">
                                    <pre id="storyText" className="has-text-justified is-pulled-left mr-6">
                                        <h2>{title}</h2>
                                        <p >{story}</p>
                                    </pre>

                                    <div className="mb-6">
                                        <h3 className="mt-0">{question}</h3>
                                        <div>{
                                            answersList.map((answer) => {
                                                return (
                                                    <div>
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
                                            })}
                                        </div>

                                        <div className="nextBtn">
                                            {this.state.currentIndex < this.state.questionList.length - 1 && (
                                                < button className="button is-outlined mb-3" onClick={this.nextQuestionHandler}>
                                                    Next Question
                                                </button>
                                            )}
                                        </div>

                                        <div className="finishBtn">
                                            {this.state.currentIndex === this.state.questionList.length - 1 &&
                                                <button className="button is-info is-outlined" onClick={this.nextQuestionHandler}>Finish</button>}
                                        </div>

                                        <span className="questionIndex mb-6">{`Question ${this.state.currentIndex + 1} of ${this.state.questionList.length}`}</span>
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

export default EnglishQuestions;