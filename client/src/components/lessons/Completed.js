import React from "react"
import axios from "axios"
import UserService from "../../services/user.service"
import authHeader from "../../services/auth-header"
import { Link } from "react-router-dom"
import ReactToPrint from 'react-to-print';

/**
 * Displays all the information from the user's completed lesson when they click on view. Makes * the background of the input or button green if correct or red if not. Also displays the
 * correct answer if the answer is incorrect.  
 *
 * @author Graham Stoves
 */

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
                this.getLesson()
            })
    }

    //Gets a lesson depending on what the lesson id is
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
        //The question list and lesson type are set
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

    //Depending on what the lesson type is, the URL will change to get the correct lesson from the api
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
            //URL is passed through depending on lesson type and the question list for that lesson is set
            await axios.get(url, {
                headers: authHeader(),
                params: { questionList: questionArray }
            })
                //Pushes all the results into the question list
                .then(res => {
                    let questionDetails = []
                    for (let i = 0; i < questionArray.length; i++) {
                        for (let j = 0; j < questionArray.length; j++) {
                            if (res.data[j].question_id === questionArray[i]) {
                                questionDetails.push(res.data[j])
                            }
                        }
                    }
                    this.setState({
                        questionList: questionDetails,
                        answerList: res.data.map((answer) => ({
                            answers: [
                                answer.answer,
                                answer.incorrect_answer_one,
                                answer.incorrect_answer_two,
                                answer.incorrect_answer_three,
                                answer.incorrect_answer_four
                            ]
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
    }

    //Imports the images from the folder
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
        let display = ""
        let lessonName = ""
        let questionNumber = 0
        const images = this.importAll(require.context('./nonverbalreasoningimages', false, /\.(svg)$/))

        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>You need to be logged in to access this page.</h1>
                </div>
            )
        }

        if (this.state.answers.userAnswers === undefined) {
            return (
                <div>
                    <div className="spinner"></div>
                    <div className="login-loading">Loading...</div>
                </div>
            )
        }

        //Checks maths and verbal reasoning questions
        if (this.state.lessonType == "math" || this.state.lessonType == "verbal_reasoning") {
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    lessonName = res.lesson_name
                    return (
                        <div style={{ marginLeft: "40px" }}>
                            <div key={i} className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left">
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="subtitle is-5 mb-3 has-text-weight-bold">Your Score: {this.props.score} out of {this.props.potentialScore}</h4>
                                </div ><br />
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        let question = result.question
                                        let answer = this.state.answers.userAnswers
                                        let specialChar = []
                                        let margBott = ""
                                        let displayBoolean = false

                                        //If the question type is 5 and includes a / or :, the answer is split so it can be checked
                                        if (result.question_type == 5 && result.answer.includes("/")) {
                                            specialChar = result.answer.split("/")
                                        } else if (result.question_type == 5 && result.answer.includes(":")) {
                                            specialChar = result.answer.split(":")
                                        } else {
                                            specialChar = result.answer.split(",")
                                        }

                                        //If the value is the same as the correct answer, make the input box green else make it red
                                        for (let x = 0; x < specialChar.length; x++) {
                                            if (answer[index + x + 1].toLowerCase() == specialChar[x]) {
                                                style.push("#1AA260")
                                                margBott = "70px"
                                            } else {
                                                style.push("#EA4335")
                                                displayBoolean = true
                                            }

                                            if (displayBoolean) {
                                                display = "block"
                                                margBott = "0px"
                                            } else {
                                                display = "none"
                                            }
                                        }

                                        //For questions that include {?}, change that back to the input box and display the users answer in that box. If it is correct, make the box green else it is red.
                                        if (result.question.includes("{?}")) {
                                            questionNumber++
                                            question = (
                                                <div key={i} className="pb-0">
                                                    {reactStringReplace(result.question, '{?}', (match, i) => {
                                                        index++
                                                        return (
                                                            <input
                                                                style={{ width: "100px", color: "white", backgroundColor: style[index] }}
                                                                className="input is-info mb-3"
                                                                value={answer[index].toLowerCase()}
                                                                readOnly
                                                            />
                                                        )
                                                    })}
                                                </div>)
                                        } else {
                                            let questionString = result.question
                                            let questionArray = questionString.split("\n")
                                            let questionSubArray = []

                                            for (let i = 0; i < questionArray.length; i++) {
                                                questionSubArray.push(questionArray[i].split(" "))
                                            }

                                            questionNumber++

                                            //For the buttons, the correct one shows as green, if it is incorrect, it will display as red and the correct when will show up in green.
                                            question = (
                                                questionSubArray.map((arr, i) => {
                                                    let oneAnswer = result.answer.split(",")[i]
                                                    index++
                                                    return (
                                                        <div key={i} style={{ display: "flex" }}>
                                                            <p>{i + 1})</p>
                                                            {
                                                                arr.map((number, j) => {
                                                                    let backgroundCol = ""
                                                                    if (number == this.state.answers.userAnswers[index]) {
                                                                        if (number == oneAnswer) {
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
                                                                            readOnly
                                                                        >{number}
                                                                        </button>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                }))
                                        }

                                        return (
                                            <div>
                                                <pre
                                                    id="question-container"
                                                    className="pb-0"
                                                    style={{ marginBottom: margBott }}
                                                >
                                                    <h3 className="subtitle is-6 has-text-weight-bold mb-2">Question {questionNumber})</h3>
                                                    {result.statement}
                                                    {result.example}
                                                    {question}
                                                </pre>
                                                <p style={{ marginBottom: "70px", display: display }}>Correct answer/answers: {result.answer.toLowerCase()}</p>
                                            </div >
                                        )
                                    })
                                }
                                </div >
                            </div >
                        </div >
                    )
                })
            }
        }

        //Checks English questions
        if (this.state.lessonType == "english") {
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0 && this.state.answerList.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    lessonName = res.lesson_name
                    return (
                        <div style={{ marginLeft: "40px" }}>
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
                                    <h4 className="subtitle is-5 mt-5 mb-0 has-text-weight-bold is-underlined">{this.state.questionList[i].english_story.title}</h4>
                                    <pre className="pl-0" style={{ width: "1000px", whiteSpace: "pre-wrap" }}>{this.state.questionList[i].english_story.story}</pre>
                                </div >
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        questionNumber++
                                        let answersList = this.state.answerList[i].answers
                                        let answer = this.state.answers.userAnswers

                                        answer = (
                                            answersList.map((answer, j) => {
                                                let oneAnswer = result.answer
                                                let userAnswer = this.state.answers.userAnswers[i]
                                                let col = ""

                                                //If the users answer is same as the answer, make the background green else make it red.
                                                if (answer == userAnswer) {
                                                    if (answer == oneAnswer) {
                                                        col = "#1AA260"
                                                        display = "none"
                                                    } else {
                                                        col = "#EA4335"
                                                        display = "block"
                                                    }
                                                } else {
                                                    if (oneAnswer == answer) {
                                                        col = "#1AA260"
                                                        display = "block"
                                                    }
                                                }

                                                return (
                                                    <div key={j}>
                                                        <button
                                                            style={{ backgroundColor: col }}
                                                            className={"button mb-3 is-outlined "}
                                                        >
                                                            {answer}
                                                        </button>
                                                        <br />
                                                    </div>
                                                )
                                            })
                                        )

                                        return (
                                            <div>
                                                <h4 id="question-container" className="subtitle is-5 mt-6 mb-4 pb-0 pl-0">
                                                    <h3 className="subtitle is-6 has-text-weight-bold mb-2">Question {questionNumber})</h3>
                                                    {result.question}
                                                </h4>
                                                {answer}
                                                <p className="pt-2" style={{ display: display }}>Correct answer: {result.answer}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        }

        //Checks non-verbal reasoning questions
        if (this.state.lessonType == "non_verbal_reasoning") {
            if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
                lesson = this.state.lessons.map((res, i) => {
                    lessonName = res.lesson_name
                    return (
                        <div style={{ marginLeft: "40px" }}>
                            <div key={i} className="box is-shadowless">
                                <div className="columns">
                                    <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                        <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Your Score: {this.props.score} out of {this.props.potentialScore}</h4>
                                </div>
                                <div>{
                                    this.state.questionList.map((result, i) => {
                                        questionNumber++
                                        let answer = this.state.answers.userAnswers
                                        let array = result.answer.split(",")

                                        //If the users answer is the same as the answer, make the background of the input box green else make it red
                                        for (let x = 0; x < array.length; x++) {
                                            if (answer[index + x + 1].toLowerCase() == array[x]) {
                                                style.push("#1AA260")
                                                display = "none"
                                            } else {
                                                style.push("#EA4335")
                                                display = "block"
                                            }
                                        }
                                        index++

                                        answer = (
                                            <div key={i} className="pb-0">
                                                <h3 className="mb-2 subtitle is-5" style={{ color: "white", borderRadius: "10px", padding: "7px", margin: "0px", width: "170px", backgroundColor: style[index] }}>Your answer: {answer[index].toLowerCase()}</h3>
                                            </div>)

                                        return (
                                            <div>
                                                <pre
                                                    id="question-container"
                                                    className="pb-0 pt-6"
                                                    style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                                >
                                                    <h3 className="subtitle is-6 has-text-weight-bold mb-2">Question {questionNumber})</h3>
                                                    <img className="non-verbal-image" src={images[result.filename]} alt="Non-Verbal" />
                                                </pre>
                                                <div className="has-text-centered">
                                                    {answer}
                                                    <h3 className="pb-6 subtitle is-5" style={{ display: display, width: "170px", textAlign: "center" }}>Correct answer: {result.answer.toLowerCase()}</h3>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        }

        return (
            //ReactToPrint allows the user to print the completed lesson or download it to a PDF
            <div ref={(response) => (this.componentRef = response)}>
                {lesson}
                < div style={{ textAlign: "center" }}>
                    <ReactToPrint
                        documentTitle={lessonName}
                        content={() => this.componentRef}
                        trigger={() =>
                            <div className="hide-button">
                                <button className="button is-outline mb-3">Download to PDF</button>
                            </div>
                        }
                    />
                    <Link className="is-danger" to="/completed">
                        <div className="hide-button">
                            <button className="button is-info" style={{ backgroundColor: "#00549F" }}>
                                Back to Completed
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
export default Completed