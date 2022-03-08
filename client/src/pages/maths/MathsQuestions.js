import React from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import UserService from "../../services/user.service";

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
            questionsEnd: false,
            score: 0,
            currentIndex: -1,
            questionList: [],
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
                this.getQuestions().then(() => { this.setState({ currentIndex: 0 }) })
            })
    }

    getQuestions = () => {
        return axios.get('http://localhost:8080/api/mathslesson', { headers: authHeader() })
            .then(res => {
                this.setState({
                    questionList: res.data
                });
            }).catch(e => {
                console.log("error: " + e)
            })
    }

    nextQuestionHandler = async () => {
        let string = this.state.questionList[this.state.currentIndex].answer
        let array = string.split(',');
        let arr = this.state.val

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === array[i]) {
                await this.setState({
                    score: this.state.score + 1
                })
                console.log("Well done!")
            }
            arr[i] = ""
        }

        if (this.state.currentIndex != this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex + 1,
                userAnswer: null,
                val: arr
            })
        } else if (this.state.currentIndex === this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex,
                questionsEnd: true
            })
        }
    }

    handleChange(e) {
        let arr = this.state.val
        arr[e.target.id] = e.target.value
        this.setState({
            userAnswer: e.target.value,
            val: arr
        });
    }

    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled: false
        })
    }

    render() {
        const reactStringReplace = require('react-string-replace');
        let statement = ""
        let question = ""

        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>You need to be logged in to access this page.</h1>
                </div>
            )
        }

        if (this.state.questionList.length > 0 && this.state.currentIndex >= 0) {
            console.log(this.state.questionList[this.state.currentIndex].answer)

            question = this.state.questionList[this.state.currentIndex].question

            if (this.state.questionList[this.state.currentIndex].question.includes("{?}")) {
                question = (
                    <div className="pb-0 mb-4">
                        {reactStringReplace(this.state.questionList[this.state.currentIndex].question, '{?}', (match, i) => (
                            <input
                                style={{ width: "100px" }}
                                className="input is-info"
                                key={i}
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
                let listItems = []
                let text = this.state.questionList[this.state.currentIndex].question;
                console.log(text)
                //const words = text.split(" ")
                const words = text.split("\n")
                console.log(words)
                //const split = text.split("\n").map(i => {
                //    return <button>{ i}</button>
                //})

                question = (
                    words.map((word) =>
                        <button className="button is-normal mr-3">{word}</button>
                    )
                )
            }
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
                        <h1 className="title is-2 has-text-weight-bold">Maths Test</h1>
                        <p className="subtitle is-6">Increase productivity of customer service staff and improve your customer.Increase productivity of customer service staff and improve your customer.</p>
                    </div>
                </div>

                <div className="container">
                    <div className="card mt-5">
                        <div className="card-content">
                            <div className="content">
                                <h2 className="mb-6">Question {this.state.currentIndex + 1}</h2>

                                <progress id="progressBar" className="progress is-primary mt-0" value={this.state.currentIndex} max={this.state.questionList.length - 1}></progress>

                                <h3>
                                    <pre id="question-container" className="is-pulled-left mt-2 mr-3 mb-4 pb-3">
                                        {statement}
                                        {question}
                                    </pre>
                                </h3>

                                <div className="nextBtn">
                                    {this.state.currentIndex < this.state.questionList.length - 1 &&
                                        < button className="button is-info is-outlined mb-3" onClick={this.nextQuestionHandler}>Next Question</button>}
                                </div>

                                <div className="finishBtn">
                                    {this.state.currentIndex === this.state.questionList.length - 1 &&
                                        <button className="button is-info is-outlined mb-3" onClick={this.nextQuestionHandler}>Finish</button>}
                                </div>

                                <span className="questionIndex">{`Question ${this.state.currentIndex + 1} of ${this.state.questionList.length}`}</span>

                                {/*<whole>1</whole><hide>&nbsp;</hide><h-frac><hf-num>3</hf-num><hide>&frasl;</hide><hf-den>8</hf-den></h-frac>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default MathQuestions;