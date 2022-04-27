import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import authHeader from "../../../services/auth-header"
import UserService from "../../../services/user.service"

/**
 * Generates Non-Verbal questions from the database
 *
 * @author Graham Stoves
 */

class NonVerbalQuestions extends React.Component {
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
            results: [],
            finalAnswer: [],
            val: ''
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

    //Gets all non-verbal questions from the database, depending on what the lesson id is
    getQuestions = async () => {
        await axios.get('https://kip-learning.herokuapp.com/api/nonverballesson', {
            headers: authHeader(),
            params: { questionList: this.props.question }
        })
            //Pushes all the results into the question list
            .then(res => {
                let questionDetails = []
                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res.data.length; j++) {
                        if (res.data[j].question_id === this.props.question[i]) {
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

    //Imports the images from the folder
    importAll = (r) => {
        let images = {}
        r.keys().forEach((item, index) => {
            images[item.replace('./', '')] = r(item)
        })
        return images
    }

    //Handles the input so the user can only type in 1 letter
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

        this.setState({
            userAnswer: e.target.value,
            val: e.target.value,
            error: ""
        })
    }

    //Function which handles the next question click, checking answer has correct input
    nextQuestionHandler = async e => {
        let answerLength = this.state.questionList[this.state.currentIndex].answer.split(',').length
        let answerString = this.state.questionList[this.state.currentIndex].answer
        let userAnswer = this.state.userAnswer
        let answerArray = answerString.split(',')

        if (userAnswer.length < answerArray.length) {
            this.setState({
                error: "Field cannot be left empty"
            })
            return
        }

        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i] === "") {
                this.setState({
                    error: "Field cannot be left empty"
                })
                return
            }
            if (userAnswer[i] === undefined) {
                this.setState({
                    error: "You can only type in letters."
                })
                return
            }
        }

        //Tallies up the total max number of points the user can get
        this.setState({
            totalNumber: this.state.totalNumber + answerLength,
        })
        this.state.finalAnswer.push(userAnswer)

        //If the users answer is the same as the answer in database they get a point
        if (userAnswer.toLowerCase() === answerString.toLowerCase()) {
            this.setState({
                score: this.state.score + 1
            })
        }

        //Checks whether there are any more questions, if there isn't, post the lesson data to the user lessons table
        if (this.state.currentIndex !== this.state.questionList.length - 1) {
            await this.setState({
                currentIndex: this.state.currentIndex + 1,
                userAnswer: null,
                val: e.target.value,
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
        let filename = ""
        let currentIndex = ""
        //Imports the images from the nonverbalreasoningimages file
        const images = this.importAll(require.context('../nonverbalreasoningimages', false, /\.(svg)$/))

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
                    <div className="spinner"></div>
                    <div className="login-loading">Loading Questions</div>
                </div>
            )
        }

        if (this.state.questionList.length > 0 && this.state.currentIndex >= 0) {
            lessonName = this.state.lessonName
            filename = this.state.questionList[this.state.currentIndex].filename
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
                                <h2 className="mb-4">Question {this.state.currentIndex + 1}</h2>

                                <img className="non-verbal-image-question" src={images[filename]} alt="Non-Verbal" />

                                <input
                                    style={{ width: "150px", height: "100px", fontSize: "25px" }}
                                    className="input is-info ml-6 non-verbal-input"
                                    placeholder="Answer"
                                    value={this.state.val}
                                    onChange={this.handleChange}
                                    maxLength="1"
                                    autoComplete="off"
                                />

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

export default NonVerbalQuestions