import React from "react"
import axios from "axios"
import UserService from "../../services/user.service"
import authHeader from "../../services/auth-header"

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
            currentIndex: 0
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
                this.getLesson()
            })
    }

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
        }).catch(e => {
            console.log("error: " + e)
        })

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

            await axios.get(url, {
                headers: authHeader(),
                params: { questionList: questionArray }
            })
                .then(res => {
                    let array = []
                    for (let i = 0; i < questionArray.length; i++) {
                        for (let j = 0; j < questionArray.length; j++) {
                            if (res.data[j].question_id === questionArray[i]) {
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
    }

    render() {
        const reactStringReplace = require('react-string-replace')
        let lesson = ""
        if (this.state.answers.userAnswers === undefined) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }

        if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
            lesson = this.state.lessons.map((res, i) => {
                return (
                    <div style={{ textAlign: "center" }}>
                        <div key={i} className="box is-shadowless mb-4" style={{ border: "2px solid #F2F2F2", borderRadius: "8px" }}>
                            <div className="columns">
                                <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold is-underlined">Lesson Name: {res.lesson_name}</h4>
                                </div>
                            </div>
                            <div>
                                <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Your Score: {this.props.score} out of {this.props.potentialScore}</h4>
                            </div><br />
                            <div>{
                                this.state.questionList.map((result, i) => {
                                    let question = result.question
                                    let answer = this.state.answers.userAnswers
                                    let style = ""

                                    for (let x = 0; x < this.state.answers.userAnswers.length; x++) {
                                        if (this.state.answers.userAnswers[x] === result.answer[x]) {
                                            style = "#34A853"
                                        } else {
                                            style = "#EA4335"
                                        }
                                    }

                                    if (result.question.includes("{?}")) {
                                        question = (
                                            <div className="pb-0">
                                                {reactStringReplace(result.question, '{?}', (match, i) => (
                                                    <input
                                                        style={{ width: "100px", color: "white", backgroundColor: style }}
                                                        className="input is-info mb-3"
                                                        key={i}
                                                        type="number"
                                                        value={answer[Math.floor(i / 2)]}
                                                        onChange={this.handleChange}
                                                        disabled
                                                    />
                                                ))}
                                            </div>)
                                    }

                                    if (result.question_type === 5) {
                                        let questionString = result.question
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
                                                            value={result.answer}
                                                            disabled
                                                        >{word}
                                                        </button>
                                                    )
                                                }
                                            </div>
                                            )
                                        )
                                    }

                                    return (
                                        <div>
                                            <pre
                                                id="question-container"
                                                className="pb-0"
                                                style={{ letterSpacing: "2px", fontSize: "1em", wordSpacing: "5px" }}
                                            >
                                                {result.statement}
                                                {question}
                                            </pre>
                                            <p className="pb-6">Correct answer/answers: {result.answer}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div >
                )
            })
        }

        return (
            <div>
                <div>{lesson}</div>
            </div >
        )

    }
}
export default Completed