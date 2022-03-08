import React from "react";
import axios from "axios";

class NonVerbalQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userAnswer: [],
            questionsEnd: false,
            score: 0,
            currentIndex: -1,
            questionList: [],
            results: [],
            val: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.getQuestions().then(() => { this.setState({ currentIndex: 0 }) })
    }

    getQuestions = () => {
        return axios.get('http://localhost:8080/api/nonverballessons')
            .then(res => {
                this.setState({
                    questionList: res.data
                })
            }).catch(e => {
                console.log("error: " + e)
            })
    }

    handleChange(e) {
        this.setState({
            userAnswer: e.target.value,
            val: e.target.value
        });
    }

    checkAnswer = () => {
        if (this.state.userAnswer === this.state.questionList[this.state.currentIndex].answer) {
            this.setState({
                score: this.state.score + 1
            })
            console.log("Well done!")
        }
    }

    nextQuestionHandler = e => {
        if (this.state.currentIndex !== this.state.questionList.length - 1) {
            this.checkAnswer()
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                userAnswer: null,
                val: e.target.value
            })
        } else if (this.state.currentIndex === this.state.questionList.length - 1) {
            this.checkAnswer()
            this.setState({
                currentIndex: this.state.currentIndex,
                questionsEnd: true
            })
        }
    }

    render() {
        //let question = ""

        if (this.state.questionList.length > 0 && this.state.currentIndex >= 0) {
            //question = this.state.questionList[this.state.currentIndex].question
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

        //console.log(this.state.questionList[this.state.currentIndex].question);
        console.log(this.state.questionList[this.state.currentIndex].answer);

        return (
            <div>
                <div className="top">
                    <div className="container">
                        <h1 className="title is-2 has-text-weight-bold">English Test</h1>
                        <p className="subtitle is-6">Increase productivity of customer service staff and improve your customer.Increase productivity of customer service staff and improve your customer.</p>
                    </div>
                </div>

                <div className="container">
                    <div className="card mt-5">
                        <div className="card-content">
                            <div className="content">
                                <h2 className="mb-4">Question {this.state.currentIndex + 1}</h2>

                                <progress id="progressBar" className="progress is-primary mt-0" value={this.state.currentIndex} max="5"></progress>


                                {/*<img className="mt-0">
                                    {question}
                                </img>*/}

                                <input
                                    style={{ width: "100px" }}
                                    className="input is-info ml-5"
                                    placeholder="Answer"
                                    value={this.state.val}
                                    onChange={this.handleChange}
                                />


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
        )
    }
}

export default NonVerbalQuestions;